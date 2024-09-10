pipeline {
    agent any
    environment {
        // Usa los nombres locales de las imágenes en lugar de un registro
        FRONTEND_IMAGE = 'product_hunt-frontend:latest'
        BACKEND_IMAGE = 'product_hunt-backend:latest'
    }
    stages {
        stage('Build Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        script {
                            // Construir la imagen de frontend
                            docker.build("${FRONTEND_IMAGE}", "Frontend")
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        script {
                            // Construir la imagen de backend
                            docker.build("${BACKEND_IMAGE}", "Backend")
                        }
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Ejecutar pruebas de Jest en el backend
                    docker.image("${BACKEND_IMAGE}").inside {
                        sh 'npm test'  // Asume que tienes "jest" como test runner en tu package.json
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Usar Docker Compose para desplegar los contenedores
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
    post {
        always {
            // Limpiar recursos no utilizados
            sh 'docker system prune -f'
        }
    }
}
