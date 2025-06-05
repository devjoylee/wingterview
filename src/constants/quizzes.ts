export const DUMMY_QUIZZES = {
  fullstack: [
    {
      question: 'RESTful API에서 리소스 생성에 사용되는 HTTP 메서드는?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      answerIdx: 1,
      commentary:
        'POST 메서드는 새로운 리소스를 생성할 때 사용됩니다. PUT은 업데이트나 생성에, GET은 조회에, DELETE는 삭제에 사용됩니다.',
    },
    {
      question: 'Node.js에서 비동기 처리를 위해 사용되지 않는 것은?',
      options: ['Callback', 'Promise', 'async/await', 'Thread'],
      answerIdx: 3,
      commentary:
        'Node.js는 싱글 스레드 기반의 이벤트 루프를 사용하므로 Thread를 직접 사용하지 않습니다. 대신 Callback, Promise, async/await를 통해 비동기 처리를 합니다.',
    },
    {
      question: 'SQL에서 INNER JOIN과 LEFT JOIN의 차이점은?',
      options: [
        'INNER JOIN은 양쪽 테이블에 모두 존재하는 데이터만 반환',
        'LEFT JOIN은 오른쪽 테이블의 모든 데이터를 반환',
        'INNER JOIN이 더 빠름',
        '차이점이 없음',
      ],
      answerIdx: 0,
      commentary:
        'INNER JOIN은 양쪽 테이블에 모두 매칭되는 데이터만 반환하고, LEFT JOIN은 왼쪽 테이블의 모든 데이터와 매칭되는 오른쪽 테이블 데이터를 반환합니다.',
    },
    {
      question: 'Express.js에서 미들웨어의 실행 순서는?',
      options: [
        '등록된 순서대로 실행',
        '알파벳 순서로 실행',
        '중요도 순서로 실행',
        '랜덤하게 실행',
      ],
      answerIdx: 0,
      commentary:
        'Express.js의 미들웨어는 등록된 순서대로 실행됩니다. 따라서 미들웨어의 등록 순서가 매우 중요합니다.',
    },
    {
      question: '다음 중 NoSQL 데이터베이스가 아닌 것은?',
      options: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'],
      answerIdx: 2,
      commentary:
        'PostgreSQL은 관계형 데이터베이스(RDBMS)입니다. MongoDB는 문서형, Redis는 키-값, Cassandra는 컬럼형 NoSQL 데이터베이스입니다.',
    },
    {
      question: 'JWT(JSON Web Token)의 구조는?',
      options: [
        'Header + Payload',
        'Header + Payload + Signature',
        'Payload + Signature',
        'Header + Signature',
      ],
      answerIdx: 1,
      commentary:
        'JWT는 Header, Payload, Signature 세 부분으로 구성되며, 각 부분은 점(.)으로 구분됩니다.',
    },
    {
      question: 'Docker에서 이미지와 컨테이너의 관계는?',
      options: [
        '이미지는 컨테이너의 실행 중인 인스턴스',
        '컨테이너는 이미지의 실행 중인 인스턴스',
        '이미지와 컨테이너는 같은 개념',
        '이미지는 컨테이너보다 작음',
      ],
      answerIdx: 1,
      commentary:
        '이미지는 애플리케이션과 환경을 패키징한 템플릿이고, 컨테이너는 이 이미지를 기반으로 실행되는 인스턴스입니다.',
    },
    {
      question: 'GraphQL의 주요 장점이 아닌 것은?',
      options: [
        '필요한 데이터만 요청 가능',
        '단일 엔드포인트 사용',
        'Over-fetching 문제 해결',
        '캐싱이 REST보다 쉬움',
      ],
      answerIdx: 3,
      commentary:
        'GraphQL은 캐싱이 REST API보다 복잡합니다. REST는 URL 기반으로 캐싱하기 쉽지만, GraphQL은 쿼리가 동적이어서 캐싱 전략이 더 복잡합니다.',
    },
    {
      question: 'CORS(Cross-Origin Resource Sharing) 에러가 발생하는 상황은?',
      options: [
        '같은 도메인에서 API 호출',
        '다른 도메인에서 API 호출',
        'HTTPS에서 HTTP API 호출',
        '모든 경우',
      ],
      answerIdx: 1,
      commentary:
        'CORS 에러는 다른 출처(도메인, 프로토콜, 포트)에서 리소스에 접근할 때 발생합니다. 보안상의 이유로 브라우저에서 제한합니다.',
    },
    {
      question: 'MVC 패턴에서 각 구성요소의 역할로 올바른 것은?',
      options: [
        'Model: 데이터 처리, View: 사용자 인터페이스, Controller: 비즈니스 로직',
        'Model: 비즈니스 로직, View: 데이터 처리, Controller: 사용자 인터페이스',
        'Model: 사용자 인터페이스, View: 비즈니스 로직, Controller: 데이터 처리',
        'Model: 데이터와 비즈니스 로직, View: 사용자 인터페이스, Controller: 흐름 제어',
      ],
      answerIdx: 3,
      commentary:
        'MVC 패턴에서 Model은 데이터와 비즈니스 로직을, View는 사용자 인터페이스를, Controller는 사용자 입력을 처리하고 Model과 View 사이의 흐름을 제어합니다.',
    },
  ],
  cloud: [
    {
      question: 'AWS에서 S3의 주요 용도는?',
      options: [
        '데이터베이스 서비스',
        '객체 스토리지 서비스',
        '컴퓨팅 서비스',
        '네트워킹 서비스',
      ],
      answerIdx: 1,
      commentary:
        'Amazon S3(Simple Storage Service)는 객체 스토리지 서비스로, 파일이나 데이터를 저장하고 관리하는 데 사용됩니다.',
    },
    {
      question: 'IaaS, PaaS, SaaS 중 가장 많은 관리 책임을 사용자가 지는 것은?',
      options: ['IaaS', 'PaaS', 'SaaS', '모두 동일'],
      answerIdx: 0,
      commentary:
        'IaaS(Infrastructure as a Service)는 인프라만 제공하므로 운영체제, 미들웨어, 애플리케이션 등을 사용자가 직접 관리해야 합니다.',
    },
    {
      question: 'Docker와 Kubernetes의 관계로 올바른 것은?',
      options: [
        'Docker가 Kubernetes를 포함',
        'Kubernetes가 Docker 컨테이너를 오케스트레이션',
        'Docker와 Kubernetes는 경쟁 관계',
        '둘 다 같은 기능',
      ],
      answerIdx: 1,
      commentary:
        'Kubernetes는 Docker 등의 컨테이너를 관리하고 오케스트레이션하는 플랫폼입니다. Docker는 컨테이너 기술이고, Kubernetes는 컨테이너 관리 도구입니다.',
    },
    {
      question: 'AWS Lambda의 특징이 아닌 것은?',
      options: [
        '서버리스 컴퓨팅',
        '사용한 만큼 과금',
        '24시간 지속 실행 가능',
        '이벤트 기반 실행',
      ],
      answerIdx: 2,
      commentary:
        'AWS Lambda는 최대 15분까지만 실행 가능합니다. 24시간 지속 실행이 필요한 경우 EC2나 다른 서비스를 사용해야 합니다.',
    },
    {
      question: 'CDN(Content Delivery Network)의 주요 목적은?',
      options: [
        '데이터 백업',
        '콘텐츠 전송 속도 향상',
        '보안 강화',
        '비용 절감',
      ],
      answerIdx: 1,
      commentary:
        'CDN은 전 세계에 분산된 서버를 통해 사용자와 가까운 위치에서 콘텐츠를 제공하여 전송 속도를 향상시키는 것이 주목적입니다.',
    },
    {
      question: 'AWS에서 VPC(Virtual Private Cloud)의 역할은?',
      options: [
        '가상 서버 제공',
        '데이터베이스 관리',
        '격리된 네트워크 환경 제공',
        '파일 저장소 제공',
      ],
      answerIdx: 2,
      commentary:
        'VPC는 AWS 클라우드 내에서 논리적으로 격리된 가상 네트워크를 제공하여 리소스를 안전하게 배치할 수 있게 합니다.',
    },
    {
      question: '다음 중 컨테이너 오케스트레이션 도구가 아닌 것은?',
      options: ['Kubernetes', 'Docker Swarm', 'Apache Mesos', 'Jenkins'],
      answerIdx: 3,
      commentary:
        'Jenkins는 CI/CD 도구입니다. Kubernetes, Docker Swarm, Apache Mesos는 모두 컨테이너 오케스트레이션 도구입니다.',
    },
    {
      question: 'Auto Scaling의 주요 장점이 아닌 것은?',
      options: [
        '트래픽에 따른 자동 확장/축소',
        '비용 최적화',
        '고가용성 보장',
        '데이터 일관성 보장',
      ],
      answerIdx: 3,
      commentary:
        'Auto Scaling은 트래픽에 따라 인스턴스를 자동으로 조정하여 성능과 비용을 최적화하지만, 데이터 일관성은 별도로 관리해야 합니다.',
    },
    {
      question: 'Microservices 아키텍처의 단점으로 올바른 것은?',
      options: [
        '확장성 부족',
        '기술 스택의 제한',
        '네트워크 복잡성 증가',
        '개발 속도 저하',
      ],
      answerIdx: 2,
      commentary:
        'Microservices는 서비스 간 통신이 네트워크를 통해 이루어지므로 네트워크 복잡성이 증가하고, 분산 시스템의 복잡성을 관리해야 합니다.',
    },
    {
      question: 'DevOps에서 CI/CD의 의미는?',
      options: [
        'Continuous Integration / Continuous Deployment',
        'Cloud Integration / Cloud Deployment',
        'Container Integration / Container Deployment',
        'Code Integration / Code Deployment',
      ],
      answerIdx: 0,
      commentary:
        'CI/CD는 Continuous Integration(지속적 통합)과 Continuous Deployment(지속적 배포)를 의미하며, 개발과 운영의 효율성을 높이는 핵심 개념입니다.',
    },
  ],
  ai: [
    {
      question: '머신러닝에서 지도학습(Supervised Learning)의 특징은?',
      options: [
        '레이블이 없는 데이터로 학습',
        '레이블이 있는 데이터로 학습',
        '보상을 통해 학습',
        '무작위로 학습',
      ],
      answerIdx: 1,
      commentary:
        '지도학습은 입력 데이터와 정답(레이블)이 함께 제공되는 데이터로 모델을 학습시키는 방법입니다.',
    },
    {
      question: '딥러닝에서 역전파(Backpropagation)의 목적은?',
      options: [
        '데이터를 전처리하기 위해',
        '가중치를 업데이트하기 위해',
        '모델을 평가하기 위해',
        '데이터를 증강하기 위해',
      ],
      answerIdx: 1,
      commentary:
        '역전파는 손실함수의 기울기를 계산하여 신경망의 가중치를 업데이트하는 핵심 알고리즘입니다.',
    },
    {
      question: 'CNN(Convolutional Neural Network)이 주로 사용되는 분야는?',
      options: ['자연어 처리', '이미지 처리', '시계열 예측', '추천 시스템'],
      answerIdx: 1,
      commentary:
        'CNN은 합성곱 연산을 통해 이미지의 특징을 효과적으로 추출할 수 있어 이미지 처리 분야에서 주로 사용됩니다.',
    },
    {
      question: 'Transformer 모델의 핵심 메커니즘은?',
      options: ['Convolution', 'Recurrence', 'Attention', 'Pooling'],
      answerIdx: 2,
      commentary:
        'Transformer는 Attention 메커니즘을 핵심으로 하여 순차적 처리 없이도 장거리 의존성을 효과적으로 모델링할 수 있습니다.',
    },
    {
      question: '과적합(Overfitting)을 방지하는 방법이 아닌 것은?',
      options: [
        'Dropout',
        'Early Stopping',
        'Data Augmentation',
        'Learning Rate 증가',
      ],
      answerIdx: 3,
      commentary:
        'Learning Rate를 증가시키면 학습이 불안정해질 수 있습니다. Dropout, Early Stopping, Data Augmentation은 모두 과적합 방지에 효과적입니다.',
    },
    {
      question: 'GPT 모델의 특징으로 올바른 것은?',
      options: [
        '양방향 언어 모델',
        '단방향 언어 모델',
        '이미지 생성 모델',
        '음성 인식 모델',
      ],
      answerIdx: 1,
      commentary:
        'GPT(Generative Pre-trained Transformer)는 이전 토큰들을 기반으로 다음 토큰을 예측하는 단방향 언어 모델입니다.',
    },
    {
      question: '강화학습에서 에이전트가 학습하는 방법은?',
      options: [
        '정답 데이터를 통해',
        '환경과의 상호작용을 통해',
        '무작위 탐색을 통해',
        '사전 정의된 규칙을 통해',
      ],
      answerIdx: 1,
      commentary:
        '강화학습에서 에이전트는 환경과 상호작용하며 받는 보상을 통해 최적의 행동 정책을 학습합니다.',
    },
    {
      question: 'BERT 모델의 주요 특징은?',
      options: [
        '단방향 인코딩',
        '양방향 인코딩',
        '이미지 처리 특화',
        '음성 인식 특화',
      ],
      answerIdx: 1,
      commentary:
        'BERT(Bidirectional Encoder Representations from Transformers)는 양방향으로 문맥을 이해하는 언어 모델입니다.',
    },
    {
      question: '다음 중 비지도학습(Unsupervised Learning) 알고리즘은?',
      options: [
        'Linear Regression',
        'Decision Tree',
        'K-Means Clustering',
        'Random Forest',
      ],
      answerIdx: 2,
      commentary:
        'K-Means Clustering은 레이블 없는 데이터를 유사성에 따라 그룹으로 나누는 비지도학습 알고리즘입니다.',
    },
    {
      question: 'LLM(Large Language Model)의 특징이 아닌 것은?',
      options: [
        '대량의 텍스트 데이터로 사전 훈련',
        '다양한 자연어 처리 태스크 수행 가능',
        '실시간 학습 가능',
        'Few-shot Learning 능력',
      ],
      answerIdx: 2,
      commentary:
        'LLM은 일반적으로 사전 훈련된 모델을 사용하며, 실시간으로 지속적인 학습을 하지는 않습니다. 대신 파인튜닝을 통해 특정 태스크에 적응시킵니다.',
    },
  ],
}
