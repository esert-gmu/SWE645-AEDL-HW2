pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('docker-credentials')
    }
    stages {
        stage('Check the repository out') {
            steps {
                echo 'Getting the latest'
                checkout scm
            }
        }

        stage('Display Creds') {
            steps {
                echo "Docker Hub Username: ${DOCKERHUB_CREDS_USR}"
                echo "Docker Hub Password: ${DOCKERHUB_CREDS_PSW}"
            }
        }


        stage('Build and push the image') {
            steps {
                script {
                    dockerImage = docker.build('esertgmu/hw2', './swe645-hw1-part2')
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials') {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Create HW2 Namespace') {
            steps {
                withAWS(profile:'default') {
                    script {
                        sh 'kubectl create namespace hw2'
                    }
                }
            }
        }

        stage('Deploy using the deployment.yaml') {
            steps {
                script {
                    sh 'export AWS_PROFILE=default && kubectl apply -f ./kubernetes/deployment.yaml'
                }
            }
        }
    }
}
