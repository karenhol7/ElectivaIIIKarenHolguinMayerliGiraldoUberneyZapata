pipeline {
  agent any
 
  stages {
    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install ./Backend'
        bat 'npm install ./Frontend'
      }
    }
  
    stage('Run Jest Tests') {
      steps {
        echo '***Running jests tests***'
        bat 'npm --prefix ./Backend run test'
      }
    }
 
    stage('Build containers') {
      steps {
        echo '***Building Docker containers***'
        bat 'docker compose up -d --build'
      }
    }
  }
}