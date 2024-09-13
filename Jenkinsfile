pipeline {
    agent any
    stages {
        stage('Dependencies') {
            steps {
                script {
                    docker.image('product_hunt-backend:latest').inside() {
                        // Ejecutar la instalación de dependencias
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Jest Test') {
            steps {
                script {
                    docker.image('product_hunt-backend:latest').inside() {
                        // Ejecutar pruebas de backend
                        sh 'npm run test'
                    }
                }
            }
        }
    }
}