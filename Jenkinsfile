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

        stage('Build And Tag The Image') {
            steps {
                sh 'docker build -t esertgmu/hw2 ./swe645-hw1-part2'
                sh 'docker tag esertgmu/hw2 esertgmu/hw2'
            }
        }

        stage('Extract Docker Credentials And Push') {
            steps {
                script {
                    echo "Docker Hub Username: ${DOCKERHUB_CREDS_USR}"
                    echo "Docker Hub Password: ${DOCKERHUB_CREDS_PSW}"
                                   
                    sh "docker login -u ${DOCKERHUB_CREDS_USR} -p ${DOCKERHUB_CREDS_PSW} registry-1.docker.io"
                    sh 'sudo docker push esertgmu/hw2'
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
