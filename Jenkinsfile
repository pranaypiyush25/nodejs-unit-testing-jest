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
            steps{
                echo 'Bug Cap Using Jira'
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

        stage('Static Code Analysis TPL Scan') {
            steps{
                echo 'Static Code Analysis TPL Scan in SonarCube'
            }
        }

        stage('Logging into AWS ECR') {
            steps {
                script {
                    sh “aws ecr get-login-password — region ${AWS_DEFAULT_REGION} | docker login — username AWS — password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com”
                }
            }
        }

        stage('Building Docker Image') {
            steps{
                script {
                    dockerImage = docker.build “${IMAGE_REPO_NAME}:${IMAGE_TAG}”
                }
            }
        }

        stage('Container Vulnerability Scan') {
            steps{
                echo 'Container Vulnerability Scan'
                script {
                    echo 'Hello Everyone'
                }
            }
        }

        stage('Pushing to ECR') {
            steps{
                script {
                    sh “docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG”
                    sh “docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}”
                }
            }
        }

    }
}
