pipeline{
    agent any
    stages{
        stage('Dependencies'){
            steps{
                docker.image('product_hunt-backend:latest').inside{
                    sh 'npm install'
                }
            }
        }
        stage('Run Jest Test'){
            steps{
                docker.image('product_hunt-backend:latest').inside{
                    sh 'npm run test'
                }
            }
        }
    }
}