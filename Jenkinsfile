/*
** Dana Jamous, Erman Sert, Lubna Fatima, Asra Naseem
This our Jenkinsfile which is  a configuration file written in Groovy syntax that defines the entire Jenkins pipeline for our project.
 It specifies the steps, stages, and actions to be executed in a CI/CD (Continuous Integration/Continuous Delivery) process.
*/


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

        stage('Deploy using the deployment.yaml') {
            steps {
                script {
                    sh 'kubectl apply -f ./kubernetes/deployment.yaml'
                    sh 'kubectl apply -f ./kubernetes/service.yaml'
                }
            }
        }
    }
}
