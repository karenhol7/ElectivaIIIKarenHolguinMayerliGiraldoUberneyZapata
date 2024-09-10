pipeline {
    agent any
    environment {
        // Referencia las imágenes ya existentes
        FRONTEND_IMAGE = 'product_hunt-frontend:latest'
        BACKEND_IMAGE = 'product_hunt-backend:latest'
    }
    stages {
        stage('Test Backend') {
            steps {
                script {
                    // Ejecutar pruebas de backend en el contenedor ya existente
                    docker.image("${BACKEND_IMAGE}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Test Frontend') {
            steps {
                script {
                    // Ejecutar pruebas de frontend en el contenedor ya existente
                    docker.image("${FRONTEND_IMAGE}").inside {
                        sh 'npm run test'
                    }
                }
            }
        }
    }
    post {
        always {
            // Limpiar recursos si es necesario
            sh 'docker system prune -f'
        }
    }
}
