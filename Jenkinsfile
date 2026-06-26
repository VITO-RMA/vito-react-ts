pipeline {
  agent any
  options {
    ansiColor('xterm')
    disableConcurrentBuilds()
  }
  environment {
    project_name = 'XXXXXXXX'
    version = get_version()
    datetime = get_datetime()

    registry = "rma-projects-docker-local.repo.vito.be"
    registry_credentials_id = "svc_git_rma"
    repository = "${project_name}_frontend"

    deploy_git_project = "argo"
    deploy_git_repo = "argocd-team-sas"
    deploy_git_branch = "master"
    deploy_credentials_id = "svc_git_rma"
    deploy_k8s_cluster = "vitoext"
    deploy_k8s_prefix = "team-sas"
    deploy_k8s_postfix_test = "stag"
    deploy_k8s_postfix_prod = "prod"
    deploy_k8s_app = get_k8s_app(deploy_k8s_prefix, project_name, deploy_k8s_postfix_test, deploy_k8s_postfix_prod)
  }
  stages {
    stage('Build builder docker image') {
      steps {
        script {
          if (env.BRANCH_NAME =~ /^(develop)$/ ) {
            sh 'cp .env.development .env'
            sh 'echo "=== .env contents ==="; cat .env'
          }
          docker.build(repository + "_builder" + ":latest-${env.BRANCH_NAME}", "--target builder --pull .")
        }
      }
    }
    stage('Build final docker image') {
      steps {
        script {
          if (env.BRANCH_NAME =~ /^(develop)$/ ) {
            sh 'cp .env.development .env'
            sh 'echo "=== .env contents ==="; cat .env'
          }
          dockerImage = docker.build(repository + ":latest-${env.BRANCH_NAME}", "--pull .")
        }
      }
    }
    stage('Push docker image to registry') {
      steps {
        script {
          docker.withRegistry("https://" + registry, registry_credentials_id ) {
            dockerImage.push("$version")
            if (env.BRANCH_NAME =~ /^(main|master)$/ ) {
              dockerImage.push("latest")
              dockerImage.push("$datetime")
            }
            if (env.TAG_NAME) {
              dockerImage.push("${env.TAG_NAME}")
            } else {
              dockerImage.push("latest-${env.BRANCH_NAME}")
            }
          }
          // Cleanup
          sh(script: "docker image rm $registry/$repository:$version")
          if (env.BRANCH_NAME =~ /^(main|master)$/ ) {
            sh(script: "docker image rm $registry/$repository:latest")
            sh(script: "docker image rm $registry/$repository:$datetime")
          }
          if (env.TAG_NAME) {
            sh(script: "docker image rm $registry/$repository:${env.TAG_NAME}")
          } else {
            sh(script: "docker image rm $registry/$repository:latest-${env.BRANCH_NAME}")
          }
        }
      }
    }
    stage("Update services") {
      when {
        expression { BRANCH_NAME =~ /^(develop|main|master)$/ }
      }
      stages {
        stage("Clone deploy repo") {
          steps {
            sh 'git config --global credential.helper cache'
            sh 'git config --global push.default simple'
            checkout([
              $class: "GitSCM",
              branches: [[name: "*/${deploy_git_branch}"]],
              userRemoteConfigs: [[
                url: "https://git.vito.be/scm/${deploy_git_project}/${deploy_git_repo}.git",
                credentialsId: "${deploy_credentials_id}"
              ]]
            ])
            sh "git checkout ${deploy_git_branch}"
          }
        }
        stage("Update image tag") {
          steps {
            script {
              def yamlPath = "clusters/${deploy_k8s_cluster}/${deploy_k8s_app}/values.yaml"
              def yamlData = readYaml(file: yamlPath)
              if (yamlData.'frontend'.image.tag != env.version) {
                echo "Updating image tag from ${yamlData.'frontend'.image.tag} to ${env.version}"
                yamlData.'frontend'.image.tag = env.version
                writeYaml(file: yamlPath, data: yamlData, overwrite: true)
                changed = true
              } else {
                echo "Image tag is already ${env.version}, no changes needed."
                changed = false
              }
            }
          }
        }
        stage("Apply changes") {
          when {
            expression { changed }
          }
          steps {
            script {
              sh '''
                git add clusters/${deploy_k8s_cluster}/${deploy_k8s_app}/values.yaml
                git commit -m "update image tag of ${repository} to ${version}"
              '''

              def pushSuccess = false
              def pushAttempt = 0
              def maxPushRetries = 5

              while (pushAttempt < maxPushRetries && !pushSuccess) {
                pushAttempt++

                try {
                  // Pull latest changes and rebase if needed
                  sh "git pull --rebase origin ${deploy_git_branch}"

                  // Push changes
                  sh "git push origin ${deploy_git_branch}"
                  pushSuccess = true
                  echo "Successfully pushed changes on push attempt ${pushAttempt}"

                } catch (Exception pushError) {
                  echo "Push attempt ${pushAttempt} failed: ${pushError.message}"

                  if (pushAttempt < maxPushRetries) {
                    // Wait before retrying push
                    sleep(time: pushAttempt * 2, unit: 'SECONDS')
                  } else {
                    throw pushError
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  post {
    always {
      deleteDir()
    }
  }
}

def get_version() {
  if (env.TAG_NAME) {
    return get_datetime() + "-${env.TAG_NAME}"
  }
  return get_datetime() + "-${env.BRANCH_NAME}"
}

def get_datetime() {
  return sh(script: "date -d @`git log -1 --format=%at` +%Y%m%d%Z%H%M", returnStdout: true).trim()
}

def get_k8s_app(deploy_k8s_prefix, project_name, deploy_k8s_test_postfix, deploy_k8s_prod_postfix) {
  if (env.BRANCH_NAME == 'develop') {
    return "${deploy_k8s_prefix}-${project_name.replace('_', '-')}-${deploy_k8s_test_postfix}"
  }
  if (env.BRANCH_NAME =~ /^(main|master)$/ ) {
    return "${deploy_k8s_prefix}-${project_name.replace('_', '-')}-${deploy_k8s_prod_postfix}"
  }
}
