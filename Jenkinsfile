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

        stage('Login to Docker') {
            steps {
                script {
                    sh "docker login -u ${DOCKERHUB_CREDS_USR} -p ${DOCKERHUB_CREDS_PSW} registry-1.docker.io"
                }
            }
        }

        stage('Build and push the image') {
            steps {
                script {
                    dockerImage = docker.build('esertgmu/hw2', './swe645-hw1-part2')
                    dockerImage.push()
                }
            }
        }

        stage('Deploy using the deployment.yaml') {
            steps {
                script {
                    sh 'kubectl apply -f ./kubernetes/deployment.yaml'
                }
            }
        }
    }
}
