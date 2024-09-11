pipeline{
    agent any
    stages{
        stage('Dependencies'){
            steps{
                bat 'npm install ./Backend'
            }
        }
        stage('Run Jest Test'){
            steps{
                bat 'npm run test ./Backend'
            }
        }
    }
}