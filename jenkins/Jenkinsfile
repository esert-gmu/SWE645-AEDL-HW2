pipeline {
    agent any
    environment {
        DOCKER_USER = credentials('docker-user')
        DOCKER_PASSWORD = credentials('docker-password')
    
    }

    stages {
        stage('Check the repository out') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh 'docker build -t esertgmu/hw2 ./SWE645-AEDL-HW2'
                    sh 'docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}'
                    sh 'docker push esertgmu/hw2'
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