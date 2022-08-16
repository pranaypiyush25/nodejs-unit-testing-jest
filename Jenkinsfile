pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Cloning Repository from Git') {
            steps {
                echo 'Pulling Code from Github'
                git branch: 'main', url: 'https://github.com/pranaypiyush25/nodejs-unit-testing-jest'
                }
            }
        
        stage('Installing Nodejs') {
            steps{
                echo 'Installing Nodejs'
                sh 'npm install'
            }
        }
        
        stage('Running Unit Test') {
            steps{
                echo 'Running Unit Test'
                sh 'npm run test'
            }
        }
    }
}
