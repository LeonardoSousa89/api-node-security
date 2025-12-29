pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-u root:root'
    }
  }

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh '''
          corepack enable
          corepack prepare pnpm@latest --activate
          pnpm install
        '''
      }
    }

    stage('Run tests (Jest)') {
      steps {
        sh 'pnpm test'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline finished successfully. Tests passed.'
    }

    failure {
      echo '❌ Pipeline failed. Tests did not pass.'
    }

    always {
      cleanWs()
    }
  }
}
