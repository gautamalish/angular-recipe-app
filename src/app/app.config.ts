import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(()=>initializeApp({
        apiKey: "AIzaSyDX-wfIyHVdfGm7SKRioWH8-SxHnm2y2ek",
        authDomain: "ang-recipe-44ce0.firebaseapp.com",
        projectId: "ang-recipe-44ce0",
        storageBucket: "ang-recipe-44ce0.appspot.com",
        messagingSenderId: "1016479212922",
        appId: "1:1016479212922:web:46f30363d30d00558122c3",
        measurementId: "G-GFTFKSVG1E"
      })),
      provideFirestore(()=>getFirestore()),
      provideStorage(()=>getStorage())
    )
  ]
};
