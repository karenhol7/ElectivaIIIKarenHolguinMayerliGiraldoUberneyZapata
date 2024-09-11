pipeline{
    agent any
    stages{
        stage('Dependencies'){
            steps{
                sh 'npm install ./Backend'
            }
        }
        stage('Run Jest Test'){
            steps{
                sh 'npm run test ./Backend'
            }
        }
    }
}