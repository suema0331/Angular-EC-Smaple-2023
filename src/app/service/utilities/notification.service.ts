// import {Injectable} from '@angular/core';
// import {MdbNotificationRef, MdbNotificationService} from 'mdb-angular-ui-kit/notification';
// // import {ErrorToastComponent} from '../../toasts/error/error.toast.component';

// @Injectable()
// export class NotificationService {
//   notificationRef: MdbNotificationRef<ErrorToastComponent> | null = null;

//   constructor(
//     // private mdbNotificationService: MdbNotificationService,
//     private logService: LogService
//   ) {}

//   networkErrorShown = false;

//   openNetworkErrorToast(): void {
//     if (!this.networkErrorShown) {

//       this.notificationRef = this.mdbNotificationService.open(ErrorToastComponent, {
//         data: {
//           message1: 'エラーが発生しました。通信環境を確認もしくは' ,
//           message2: '時間をおいて再度お試しください。' ,
//           closeHandler: () => this.notificationRef?.close() },
//         stacking: true,
//         position: 'top-center',
//         autohide: false,
//         // width: '100%',
//         delay: 2000,
//         // offset: 10
//       });
//       this.notificationRef.onClose.subscribe(() => {this.logService.logDebug('エラートーストが閉じました！！！'); });
//       this.networkErrorShown = true;
//     }
//   }

//   openErrorToast(message1: string): void {
//     this.notificationRef = this.mdbNotificationService.open(ErrorToastComponent, {
//       data: { message1 },
//       stacking: true,
//       position: 'top-left',
//       autohide: true,
//       width: '100%',
//       delay: 2000,
//       offset: 0
//     });
//     this.notificationRef.onClose.subscribe(() => {this.logService.logDebug('エラートーストが閉じました！！！'); });
//   }
// }
