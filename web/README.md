# Survey Web

Pages

Root  
│   layout.tsx  
│   page.tsx  
│  
├───admin  
│   │   layout.tsx  
│   │   page.tsx  
│   │  
│   ├───new-survey  
│   │   │   page.tsx  
│   │   │  
│   │   └───[id]  
│   │           page.tsx  
│   │  
│   ├───questions  
│   │       page.tsx  
│   │  
│   └───survey-details  
│       └───[id]  
│               page.tsx  
│  
├───api  
│   ├───auth  
│   │   └───[...nextauth]  
│   │           route.ts  
│   │  
│   ├───get-questions  
│   │       route.ts  
│   │  
│   ├───partipiciant  
│   │       route.ts  
│   │  
│   └───submit-answers  
│           route.ts  
│  
├───login  
│       page.tsx  
│  
└───survey  
    │   layout.tsx  
    │   page.tsx  
    │  
    ├───completed  
    │       page.tsx  
    │  
    └───questions  
            page.tsx  
