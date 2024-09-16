pipeline {
    agent any
    stages {
        stage('Dependencies') {
            steps {
                echo 'Installing dependencies...'
                /*script {
                    docker.image('product_hunt-backend:latest').inside() {
                        dir('Backend') {
                            sh 'npm install'
                        }
                    }
                }*/
            }
        }
        /*stage('Run Jest Test') {
            steps {
                script {
                    echo 'Running Tests...'
                    docker.image('product_hunt-backend:latest').inside() {
                        dir('Backend') {
                            sh 'npm run test'
                        }
                    }
                }
            }
        }*/
    }
}

