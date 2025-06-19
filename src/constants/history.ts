export const DUMMY_HISTORY_LIST: HistoryListData[] = [
  {
    id: '1',
    createdAt: '6월 12일',
    firstQuestion: 'SQL에서 INNER JOIN과 LEFT JOIN의 차이점은?',
    questionCount: 1,
    duration: 5,
    hasFeedback: false,
    isFeedbackRequested: true,
  },

  {
    id: '2',
    createdAt: '6월 12일',
    firstQuestion: 'RESTful API에서 리소스 생성에 사용되는 HTTP 메서드는?',
    questionCount: 5,
    duration: 15,
    hasFeedback: true,
    isFeedbackRequested: true,
  },
]

export const DUMMY_HISTORY_DETAIL: FeedbackPageData = {
  createdAt: '2025.06.10',
  duration: 25,
  recordingUrl: 'https://example.com/recording/1',
  feedback: [
    {
      question: 'Docker에서 이미지와 컨테이너의 관계는?',
      modelAnswer:
        'Docker 이미지는 애플리케이션과 그 의존성을 포함하는 읽기 전용 템플릿입니다. 여기에는 코드, 런타임, 시스템 도구, 라이브러리 등이 포함됩니다. 반면 컨테이너는 이미지의 실행 가능한 인스턴스로, 이미지를 기반으로 생성됩니다. 프로그래밍에서 클래스와 객체의 관계와 유사하다고 볼 수 있죠. 이미지는 불변이지만, 컨테이너는 상태를 가지며 변경될 수 있습니다. 실무에서는 이미지를 빌드하여 레지스트리에 저장하고, 필요할 때 컨테이너로 실행하는 방식으로 활용합니다.',
      commentary:
        '기본 개념은 잘 이해하고 있으며, 프로그래밍 개념과 연결지어 설명한 부분이 좋습니다. 다만 이미지 레이어 개념이나 컨테이너의 격리성에 대한 설명이 부족했습니다. 또한 실제 프로젝트 경험을 언급했지만, 더 구체적인 사례나 문제 해결 경험을 공유했다면 더 좋았을 것 같습니다.',
      startAt: 0,
      endAt: 180,
    },
    {
      question: 'CORS(Cross-Origin Resource Sharing) 에러가 발생하는 이유는?',
      modelAnswer:
        'CORS 에러는 웹 브라우저의 Same-Origin Policy라는 보안 정책 때문에 발생합니다. 이 정책은 한 출처에서 로드된 웹 페이지가 다른 출처의 리소스에 접근하는 것을 제한합니다. 예를 들어, example.com에서 로드된 JavaScript가 api.another.com의 데이터를 가져오려고 할 때 발생할 수 있죠. 이를 해결하기 위해서는 서버 측에서 적절한 CORS 헤더를 응답에 포함시켜야 합니다. 주로 Access-Control-Allow-Origin 헤더로 어떤 출처의 요청을 허용할지 지정하고, 복잡한 요청의 경우 preflight 요청에 대한 처리도 필요합니다.',
      commentary:
        'CORS에 대한 이해가 전반적으로 좋은 편입니다. Same-Origin Policy의 개념을 정확히 언급했고, 실제 개발 경험과 연결지어 설명한 점이 좋습니다. 다만 preflight 요청이나 credentials 옵션 같은 좀 더 심화된 내용까지 언급했다면 더 완벽했을 것 같습니다. 또한 CORS가 왜 필요한지에 대한 보안적 측면의 설명이 조금 부족했습니다.',
      startAt: 180,
      endAt: 360,
    },
    {
      question: 'AWS에서 S3의 주요 용도는?',
      modelAnswer:
        'AWS S3는 확장성 높은 객체 스토리지 서비스로, 여러 용도로 활용됩니다. 가장 일반적인 용도로는 정적 웹사이트 호스팅, 백업 및 복구 솔루션, 빅데이터 분석을 위한 데이터 레이크 구축, 미디어 및 소프트웨어 배포가 있습니다. 또한 모바일 앱이나 게임의 사용자 생성 콘텐츠 저장, IoT 데이터 저장, 재해 복구 등에도 활용됩니다. S3는 높은 내구성과 가용성을 제공하며, 버전 관리, 라이프사이클 정책, 암호화 등 다양한 기능을 통해 데이터를 효율적으로 관리할 수 있습니다. 특히 다른 AWS 서비스와의 통합이 잘 되어 있어 클라우드 아키텍처의 중요한 구성 요소로 사용됩니다.',
      commentary:
        'S3의 기본 개념과 주요 용도에 대한 이해가 있습니다. 실제 사용 경험을 언급한 점이 좋습니다. 하지만 S3의 다양한 활용 사례(데이터 레이크, CDN과의 연동, 서버리스 아키텍처에서의 역할 등)나 고급 기능(버전 관리, 라이프사이클 정책, 크로스 리전 복제 등)에 대한 언급이 부족했습니다. 또한 보안 측면(버킷 정책, IAM 등)에 대한 설명도 추가되면 더 완벽한 답변이 될 것 같습니다.',
      startAt: 360,
      endAt: 480,
    },
  ],
}
