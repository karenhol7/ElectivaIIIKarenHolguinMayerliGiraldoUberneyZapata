pipeline {
    agent any
    stages {
        stage('Dependencies') {
            steps {
                script {
                    docker.image('product_hunt-backend:latest').inside() {
                        dir('Backend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        stage('Run Jest Test') {
            steps {
                script {
                    docker.image('product_hunt-backend:latest').inside() {
                        dir('Backend') {
                            sh 'npm run test'
                        }
                    }
                }
            }
        }
    }
}
