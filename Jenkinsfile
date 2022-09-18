pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = "052612660561"
        AWS_DEFAULT_REGION = "us-east-1"
        IMAGE_REPO_NAME = "jenkins-pipeline"
        IMAGE_TAG = "latest"
        REPOSITORY_URL = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

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

        stage('Bug Cap Using Jira'){
            steps {
                echo 'Bug Cap Using Jira'
            }
        }
        
        stage('Installing Nodejs') {
            steps {
                echo 'Installing Nodejs'
                sh 'npm install'
            }
        }
        
        stage('Running Unit Test') {
            steps {
                echo 'Running Unit Test'
                sh 'npm run test'
            }
        }

        stage('SonarQube analysis') {
            steps {
                echo 'Static Code Analysis in SonarCube'
                withSonarQubeEnv('SonarQube') {
                    sh "npm install sonar-scanner"
                    sh "npm run sonar"
                }
            }
        }
        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
