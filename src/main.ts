import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx/WmFZfVpgdVRMY1tbRn9PMyBoS35RckVnWX1fcXdSRGlYWUNy');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));