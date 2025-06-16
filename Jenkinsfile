pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-northeast-2'
    S3_BUCKET = 'winterview-dev'
    CLOUDFRONT_DIST_ID = 'E2P5DOV93GKL9D'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'dev', url: 'https://github.com/100-hours-a-week/10-team-matching-quiz-fe.git'
      }
    }

    stage('Prepare Env File') {
      steps {
        withCredentials([file(credentialsId: 'env-dev', variable: 'ENV_FILE')]) {
          sh '''
            echo ".env 파일 복사 중"
            cp $ENV_FILE .env
          '''
        }
      }
    }

    stage('Install & Build') {
      steps {
        sh '''
          npm install
          npm run build
        '''
      }
    }

    stage('Upload to S3') {
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'aws-cred',
          accessKeyVariable: 'AWS_ACCESS_KEY_ID',
          secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
          sh '''
            aws s3 sync ./dist s3://$S3_BUCKET \
              --region $AWS_REGION \
              --cache-control "no-cache" \
              --delete
          '''
        }
      }
    }

    stage('Invalidate CloudFront') {
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'aws-cred',
          accessKeyVariable: 'AWS_ACCESS_KEY_ID',
          secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
          sh '''
            aws cloudfront create-invalidation \
              --distribution-id $CLOUDFRONT_DIST_ID \
              --paths "/*"
          '''
        }
      }
    }
  }
}
