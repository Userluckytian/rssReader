import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
/*
    引入你需要的图标，推荐 ✔️
    Zorro：http://ng.ant.design/components/icon/zh#%E9%9D%99%E6%80%81%E5%8A%A0%E8%BD%BD%E4%B8%8E%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD
    
    tip:
    import { icon1, icon2 } from '@ant-design/icons-angular/icons';
    先写好：import { } from '@ant-design/icons-angular/icons';
    当你输入icon1，icon2的时候会有智能提示。不用担心不知道图标的名称！
*/ 
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, LockOutline, LinkOutline, SkinOutline } from '@ant-design/icons-angular/icons';
// 存放图标
const icons: IconDefinition[] = [ 
    UserOutline, 
    LockOutline,
    LinkOutline,
    SkinOutline
];
// 存放Module
const zorroModule = [
    NzDividerModule,
    NzSpinModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzLayoutModule,
    NzToolTipModule,
    NzMenuModule,
    NzNoAnimationModule,
    NzEmptyModule,
    NzCheckboxModule,
    NzSelectModule,
]
export {
    zorroModule
}
