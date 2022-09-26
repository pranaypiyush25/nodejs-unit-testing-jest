podTemplate(yaml: '''
  apiVersion: v1
  kind: Pod
  spec:
    containers:
    - name: node
      image: 341118756977.dkr.ecr.ap-south-1.amazonaws.com/node-alpine:14.18.1 
      imagePullPolicy: Always
      command:
      - sleep
      args:
      - 99d
      env:
      - name: GIT_PAT
        valueFrom:
          secretKeyRef:
            name: jenkins-agent-secret
            key: GIT_PAT_READ
      - name: GIT_PACKAGES_PAT_PUBLISH
        valueFrom:
          secretKeyRef:
            name: jenkins-agent-secret
            key: GIT_PACKAGES_PAT_PUBLISH
    - name: common
      image: 341118756977.dkr.ecr.ap-south-1.amazonaws.com/common-alpine:3.16
      imagePullPolicy: Always
      command:
      - sleep
      args:
      - 99d
      env:
      - name: GIT_PAT
        valueFrom:
          secretKeyRef:
            name: jenkins-agent-secret
            key: GIT_PAT_READ
      - name: GIT_PAT_WRITE
        valueFrom:
          secretKeyRef:
            name: jenkins-agent-secret
            key: GIT_PAT_WRITE
      - name: AWS_ACCESS_KEY_ID
        valueFrom:
          secretKeyRef:
            name: aws-secrets
            key: accessKeyId
      - name: AWS_SECRET_ACCESS_KEY
        valueFrom:
          secretKeyRef:
            name: aws-secrets
            key: secretAccessKey
    - name: make
      image: abhi96/alpine:3.16
      imagePullPolicy: Always
      command:
      - sleep
      args:
      - 99d
    - name: aws-cli
      image: amazon/aws-cli:2.7.27
      command:
      - sleep
      args:
      - 99d
      env:
      - name: AWS_ACCESS_KEY_ID
        valueFrom:
          secretKeyRef:
            name: aws-secrets
            key: accessKeyId
      - name: AWS_SECRET_ACCESS_KEY
        valueFrom:
          secretKeyRef:
            name: aws-secrets
            key: secretAccessKey
    - name: docker
      image: docker:latest
      command:
        - /bin/cat
      tty: true
      volumeMounts:
        - name: dind-certs
          mountPath: /certs
      env:
        - name: DOCKER_TLS_CERTDIR
          value: /certs
        - name: DOCKER_CERT_PATH
          value: /certs
        - name: DOCKER_TLS_VERIFY
          value: 1
        - name: DOCKER_HOST
          value: tcp://localhost:2376
    - name: dind
      image: docker:dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: /certs
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
        - name: dind-certs
          mountPath: /certs/client
    volumes:
    - name: dind-storage
      emptyDir: {}
    - name: dind-certs
      emptyDir: {}
    
''') {
node(POD_LABEL) {
    try {
            stage('Cloning Git Repo') {
                container('common'){
                    git branch: 'main', url: 'https://github.com/pranaypiyush25/nodejs-unit-testing-jest'
                }
            }

            stage('Installing Nodejs') {
                container('node') {
                    echo 'Installing Nodejs'
                    sh 'npm install'
                }
            }

            stage('SonarQube analysis') {
                container('node') {
                    echo 'Static Code Analysis in SonarQube'
                    def scannerHome = tool 'sonarqube-scanner'
                    withSonarQubeEnv('sonarqube-ec2') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }

            stage("Quality gate") {
                steps {
                    waitForQualityGate abortPipeline: true
                }
            }
        } catch(e) {
            throw e
        }
    }
}

