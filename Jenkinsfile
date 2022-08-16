pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('git') {
            steps {
                echo 'Pulling Code from Github'
                git branch: 'main', url: 'https://github.com/pranaypiyush25/nodeweb'
                }
            }
        stage('Unit Test') {
            steps{
                echo 'Unit Test'
            }
        }
        stage('Code Coverage') {
            steps{
                echo 'Code Coverage'
            }
        }
    }
}
