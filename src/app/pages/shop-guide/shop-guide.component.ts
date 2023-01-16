import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-shop-guide',
  templateUrl: './shop-guide.component.html',
  styleUrls: ['./shop-guide.component.scss']
})
export class ShopGuideComponent {
  screenName = 'ShopGuideComponent';
  steps = [
    {
      name: 'STEP1',
      title: '商品をえらぶ',
      img: './assets/custom-components/step-modal/onboarding_img_step1@2x.png',
      message: 'よく買う商品はTOPページでサクッと選択！商品のサイズも比較しなが選べる',
      btn_name: '次へ'
    },
    {
      name: 'STEP2',
      title: 'こだわりを指定する',
      img: './assets/custom-components/step-modal/onboarding_img_step2@2x.png',
      message: '項目を選ぶだけ。あなただけのこだわり食材を注文可能',
      btn_name: '次へ'
    },
    {
      name: 'STEP3',
      title: '受け取り方法をえらぶ',
      img: './assets/custom-components/step-modal/onboarding_img_step3@2x.png',
      message: 'ご自宅に置き配送、またはオンタイム配送で対面受け取り',
      btn_name: '次へ'
    },
    {
      name: 'STEP4',
      title: '商品を受け取る',
      img: './assets/custom-components/step-modal/onboarding_img_step4@2x.png',
      message: 'お届け完了はメールでお知らせ。指定した時間にご自宅へお届け',
      btn_name: 'はじめる',
      last: true
    },
  ]

  constructor(public modalRef: MdbModalRef<ShopGuideComponent>){}
}
