pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 10, unit: 'MINUTES')
        retry(2)
    }

    environment {
        IMAGE_NAME = 'book-app-image'
        CONTAINER_NAME = 'book-app-container'
    }

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/malkiAbdelhamid/book-app.git'
            }
        }

        stage('Install & Test (Dockerized)') {
            steps {
                script {
                    docker.image('node:18').inside('-e HOME=/tmp') {
                        sh '''
                        npm install
                        npm test
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Approval') {
            steps {
                input message: 'Deploy to production?', ok: 'Yes, Deploy!'
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    def status = sh(
                        script: "docker inspect -f '{{.State.Running}}' ${CONTAINER_NAME} || echo 'not_found'",
                        returnStdout: true
                    ).trim()

                    if (status != "true") {
                        error("Deployment verification failed! Container is not running.")
                    } else {
                        echo "Deployment verified: Container is running."
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline Finished'
            deleteDir()
        }
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed!'
        }
    }
}
