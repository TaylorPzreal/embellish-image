pipeline {
    agent { docker 'node:13.8.0' }
    stages {
        stage('build') {
            steps {
                sh 'yarn -v'
                sh 'yarn install'
                sh 'yarn build'
            }
        }
    }
}
