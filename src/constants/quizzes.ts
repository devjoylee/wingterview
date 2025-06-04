import { QuizData } from '@/types/quiz'

export const DUMMY_QUIZZES: QuizData[] = [
  {
    question: 'React에서 컴포넌트 생명주기 메서드가 아닌 것은?',
    options: [
      'componentDidMount',
      'shouldComponentUpdate',
      'componentWillReceiveProps',
      'componentRender',
    ],
    answerIdx: 3,
    commentary:
      'componentRender는 React의 생명주기 메서드가 아닙니다. 실제 메서드는 render()입니다.',
  },
  {
    question: "JavaScript에서 '호이스팅(Hoisting)' 이란 무엇인가?",
    options: [
      '변수 선언이 스코프의 최상단으로 끌어올려지는 현상',
      '함수 호출을 최적화하는 기술',
      '변수 타입을 자동으로 변경하는 기능',
      '코드를 압축하는 과정',
    ],
    answerIdx: 0,
    commentary:
      '호이스팅은 변수와 함수 선언이 물리적으로 작성한 코드의 상단으로 끌어올려지는 JavaScript의 동작 방식입니다.',
  },
  {
    question:
      'TypeScript에서 인터페이스(Interface)와 타입 별칭(Type Alias)의 주요 차이점은?',
    options: [
      '인터페이스는 확장 가능하지만 타입 별칭은 확장 불가능',
      '타입 별칭은 컴파일 시 제거되지만 인터페이스는 남음',
      '인터페이스는 런타임에 존재하지만 타입 별칭은 존재하지 않음',
      '차이점이 없음',
    ],
    answerIdx: 0,
    commentary:
      '인터페이스는 확장(extends)이 가능하지만 타입 별칭은 확장이 불가능합니다. 타입 별칭은 교집합(&)을 사용하여 유사한 효과를 낼 수 있습니다.',
  },
  {
    question: "CSS에서 'em' 단위의 기준이 되는 것은?",
    options: [
      '부모 요소의 폰트 크기',
      '루트 요소(html)의 폰트 크기',
      '현재 요소의 폰트 크기',
      '브라우저 기본 폰트 크기',
    ],
    answerIdx: 2,
    commentary:
      'em 단위는 현재 요소에 지정된 폰트 크기를 기준으로 합니다. 만약 현재 요소에 폰트 크기가 지정되지 않았다면 상속받은 폰트 크기를 기준으로 합니다.',
  },
  {
    question: 'HTTP 상태 코드 503의 의미는?',
    options: [
      '페이지를 찾을 수 없음',
      '서버 내부 오류',
      '서비스 이용 불가',
      '권한 없음',
    ],
    answerIdx: 2,
    commentary:
      '503(Service Unavailable)은 서버가 현재 요청을 처리할 준비가 되지 않았음을 나타냅니다. 일반적으로 유지 보수나 과부하 상태일 때 발생합니다.',
  },
  {
    question: '다음 중 Git 명령어가 아닌 것은?',
    options: ['git rebase', 'git squash', 'git bisect', 'git cherry-pick'],
    answerIdx: 1,
    commentary:
      "'git squash'는 독립된 명령어가 아닙니다. 'git rebase -i'를 사용하여 여러 커밋을 하나로 합치는(squash) 작업을 수행할 수 있습니다.",
  },
  {
    question: '웹 접근성(Accessibility)에서 ARIA의 역할은?',
    options: [
      '웹 페이지의 시각적 디자인 향상',
      '보조기기 사용자를 위한 추가 정보 제공',
      '웹 사이트 성능 최적화',
      '검색 엔진 최적화',
    ],
    answerIdx: 1,
    commentary:
      'ARIA(Accessible Rich Internet Applications)는 보조기기가 웹 콘텐츠를 더 잘 이해할 수 있도록 추가 정보를 제공하는 기술입니다.',
  },
  {
    question: '다음 중 SSR(Server Side Rendering)의 장점이 아닌 것은?',
    options: [
      '초기 로딩 속도 향상',
      'SEO에 유리',
      '서버 부하 감소',
      '캐싱 효율성 증가',
    ],
    answerIdx: 2,
    commentary:
      'SSR은 서버에서 페이지를 렌더링하기 때문에 서버 부하가 증가하는 단점이 있습니다. 대신 초기 로딩 속도가 빠르고 SEO에 유리합니다.',
  },
  {
    question: 'JavaScript에서 Promise의 상태가 아닌 것은?',
    options: ['pending', 'fulfilled', 'rejected', 'completed'],
    answerIdx: 3,
    commentary:
      'Promise의 상태는 pending(대기 중), fulfilled(이행됨), rejected(거부됨) 세 가지입니다. completed는 Promise의 공식 상태가 아닙니다.',
  },
  {
    question: 'CSS Flexbox에서 justify-content 속성의 기본값은?',
    options: ['flex-start', 'center', 'flex-end', 'space-between'],
    answerIdx: 0,
    commentary:
      'justify-content의 기본값은 flex-start로, 아이템들을 컨테이너의 시작 부분(주축 기준)에 정렬합니다.',
  },
]
