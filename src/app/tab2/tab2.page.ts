import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, PluginRegistry } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Album } from "goodeventalbum";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      // source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
  photo: SafeResourceUrl;
  callJava(){
    Album.echo({value:'xxx'})
    .then(value => {
      console.log(value)
    })
  }
  constructor(private sanitizer: DomSanitizer) {  }

}
