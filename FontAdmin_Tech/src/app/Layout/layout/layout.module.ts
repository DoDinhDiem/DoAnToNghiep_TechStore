import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { AvatarModule } from 'primeng/avatar'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { BadgeModule } from 'primeng/badge'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { CarouselModule } from 'primeng/carousel'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { ChartModule } from 'primeng/chart'
import { CheckboxModule } from 'primeng/checkbox'
import { ChipModule } from 'primeng/chip'
import { ChipsModule } from 'primeng/chips'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ColorPickerModule } from 'primeng/colorpicker'
import { ContextMenuModule } from 'primeng/contextmenu'
import { DataViewModule } from 'primeng/dataview'
import { VirtualScrollerModule } from 'primeng/virtualscroller'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'
import { DockModule } from 'primeng/dock'
import { DragDropModule } from 'primeng/dragdrop'
import { DropdownModule } from 'primeng/dropdown'
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { EditorModule } from 'primeng/editor'
import { FieldsetModule } from 'primeng/fieldset'
import { FileUploadModule } from 'primeng/fileupload'
import { GalleriaModule } from 'primeng/galleria'
import { InplaceModule } from 'primeng/inplace'
import { InputMaskModule } from 'primeng/inputmask'
import { InputSwitchModule } from 'primeng/inputswitch'
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ImageModule } from 'primeng/image'
import { KnobModule } from 'primeng/knob'
import { ListboxModule } from 'primeng/listbox'
import { MegaMenuModule } from 'primeng/megamenu'
import { MenuModule } from 'primeng/menu'
import { MenubarModule } from 'primeng/menubar'
import { MessageModule } from 'primeng/message'
import { MessagesModule } from 'primeng/messages'
import { MultiSelectModule } from 'primeng/multiselect'
import { OrderListModule } from 'primeng/orderlist'
import { OrganizationChartModule } from 'primeng/organizationchart'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { PaginatorModule } from 'primeng/paginator'
import { PanelModule } from 'primeng/panel'
import { PanelMenuModule } from 'primeng/panelmenu'
import { PasswordModule } from 'primeng/password'
import { PickListModule } from 'primeng/picklist'
import { ProgressBarModule } from 'primeng/progressbar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { RatingModule } from 'primeng/rating'
import { ScrollerModule } from 'primeng/scroller'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { ScrollTopModule } from 'primeng/scrolltop'
import { SelectButtonModule } from 'primeng/selectbutton'
import { SidebarModule } from 'primeng/sidebar'
import { SkeletonModule } from 'primeng/skeleton'
import { SlideMenuModule } from 'primeng/slidemenu'
import { SliderModule } from 'primeng/slider'
import { SpeedDialModule } from 'primeng/speeddial'
import { SpinnerModule } from 'primeng/spinner'
import { SplitButtonModule } from 'primeng/splitbutton'
import { SplitterModule } from 'primeng/splitter'
import { StepsModule } from 'primeng/steps'
import { TabMenuModule } from 'primeng/tabmenu'
import { TableModule } from 'primeng/table'
import { TabViewModule } from 'primeng/tabview'
import { TagModule } from 'primeng/tag'
import { TerminalModule } from 'primeng/terminal'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { TimelineModule } from 'primeng/timeline'
import { ToastModule } from 'primeng/toast'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { ToolbarModule } from 'primeng/toolbar'
import { TooltipModule } from 'primeng/tooltip'
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox'
import { TreeModule } from 'primeng/tree'
import { TreeSelectModule } from 'primeng/treeselect'
import { TreeTableModule } from 'primeng/treetable'
import { AnimateModule } from 'primeng/animate'
import { CardModule } from 'primeng/card'
import { BlockUIModule } from 'primeng/blockui'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { RippleModule } from 'primeng/ripple'

import { LayoutComponent } from '../layout/layout.component'

import { HeaderComponent } from '../header/header.component'
import { MenuComponent } from '../menu/menu.component'
import { FooterComponent } from '../footer/footer.component'

import { LoaiSanPhamComponent } from '../../Pages/loai-san-pham/loai-san-pham.component'
import { DashboardComponent } from '../../Pages/dashboard/dashboard.component'
import { HangSanPhamComponent } from '../../Pages/hang-san-pham/hang-san-pham.component'
import { SanPhamComponent } from 'src/app/Pages/san-pham/san-pham.component'
import { AnhSanPhamComponent } from 'src/app/Pages/anh-san-pham/anh-san-pham.component'
import { ThongSoSanPhamComponent } from 'src/app/Pages/thong-so-san-pham/thong-so-san-pham.component'
import { DanhMucTinTucComponent } from 'src/app/Pages/danh-muc-tin-tuc/danh-muc-tin-tuc.component'
import { TinTucComponent } from 'src/app/Pages/tin-tuc/tin-tuc.component'
import { AnhTinTucComponent } from 'src/app/Pages/anh-tin-tuc/anh-tin-tuc.component'
import { BinhLuanTinTucComponent } from 'src/app/Pages/binh-luan-tin-tuc/binh-luan-tin-tuc.component'
import { NhaCungCapComponent } from 'src/app/Pages/nha-cung-cap/nha-cung-cap.component'
import { HoaDonNhapComponent } from 'src/app/Pages/hoa-don-nhap/hoa-don-nhap.component'
import { HoaDonXuatComponent } from 'src/app/Pages/hoa-don-xuat/hoa-don-xuat.component'
import { ChucVuComponent } from 'src/app/Pages/chuc-vu/chuc-vu.component'
import { NhanVienComponent } from 'src/app/Pages/nhan-vien/nhan-vien.component'
import { KhachHangComponent } from 'src/app/Pages/khach-hang/khach-hang.component'
import { RoleComponent } from 'src/app/Pages/role/role.component'
import { SlideComponent } from 'src/app/Pages/slide/slide.component'
import { AboutComponent } from 'src/app/Pages/about/about.component'
import { ContactComponent } from 'src/app/Pages/contact/contact.component'
import { SafePipe } from 'src/app/Pages/contact/safe.pipe'

import { LoaiSanPhamModule } from '../../Pages/loai-san-pham/loai-san-pham.module'
import { DashboardModule } from '../../Pages/dashboard/dashboard.module'
import { HangSanPhamModule } from '../../Pages/hang-san-pham/hang-san-pham.module'
import { SanPhamModule } from 'src/app/Pages/san-pham/san-pham.module'
import { AnhSanPhamModule } from 'src/app/Pages/anh-san-pham/anh-san-pham.module'
import { ThongSoSanPhamModule } from 'src/app/Pages/thong-so-san-pham/thong-so-san-pham.module'
import { DanhMucTinTucModule } from 'src/app/Pages/danh-muc-tin-tuc/danh-muc-tin-tuc.module'
import { TinTucModule } from 'src/app/Pages/tin-tuc/tin-tuc.module'
import { AnhTinTucModule } from 'src/app/Pages/anh-tin-tuc/anh-tin-tuc.module'
import { BinhLuanTinTucModule } from 'src/app/Pages/binh-luan-tin-tuc/binh-luan-tin-tuc.module'
import { NhaCungCapModule } from 'src/app/Pages/nha-cung-cap/nha-cung-cap.module'
import { HoaDonNhapModule } from 'src/app/Pages/hoa-don-nhap/hoa-don-nhap.module'
import { HoaDonXuatModule } from 'src/app/Pages/hoa-don-xuat/hoa-don-xuat.module'
import { ChucVuModule } from 'src/app/Pages/chuc-vu/chuc-vu.module'
import { NhanVienModule } from 'src/app/Pages/nhan-vien/nhan-vien.module'
import { KhachHangModule } from 'src/app/Pages/khach-hang/khach-hang.module'
import { RoleModule } from 'src/app/Pages/role/role.module'
import { SlideModule } from 'src/app/Pages/slide/slide.module'
import { AboutModule } from 'src/app/Pages/about/about.module'
import { ContactModule } from 'src/app/Pages/contact/contact.module'
import { AccountComponent } from 'src/app/Pages/account/account.component'
import { AccountModule } from 'src/app/Pages/account/account.module'
import { FeedBackComponent } from 'src/app/Pages/feed-back/feed-back.component'
import { FeedBackModule } from 'src/app/Pages/feed-back/feed-back.module'
import { ResetPassComponent } from 'src/app/Pages/reset-pass/reset-pass.component'
import { ResetPassModule } from 'src/app/Pages/reset-pass/reset-pass.module'
import { ChangePassComponent } from 'src/app/Pages/change-pass/change-pass.component'
import { ChangePassModule } from 'src/app/Pages/change-pass/change-pass.module'
import { MaGiamGiaComponent } from 'src/app/Pages/ma-giam-gia/ma-giam-gia.component'
import { GiamGiaActiveComponent } from 'src/app/Pages/giam-gia-active/giam-gia-active.component'
import { GiamGiaActiveModule } from 'src/app/Pages/giam-gia-active/giam-gia-active.module'
import { MaGiamGiaModule } from 'src/app/Pages/ma-giam-gia/ma-giam-gia.module'
import { TokenInterceptor } from 'src/app/Interceptors/Token.interceptor'

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        LoaiSanPhamComponent,
        DashboardComponent,
        HangSanPhamComponent,
        SanPhamComponent,
        AnhSanPhamComponent,
        ThongSoSanPhamComponent,
        DanhMucTinTucComponent,
        TinTucComponent,
        AnhTinTucComponent,
        BinhLuanTinTucComponent,
        NhaCungCapComponent,
        HoaDonNhapComponent,
        HoaDonXuatComponent,
        ChucVuComponent,
        NhanVienComponent,
        KhachHangComponent,
        RoleComponent,
        SlideComponent,
        AboutComponent,
        ContactComponent,
        SafePipe,
        AccountComponent,
        FeedBackComponent,
        ResetPassComponent,
        ChangePassComponent,
        MaGiamGiaComponent,
        GiamGiaActiveComponent
    ],
    imports: [
        LoaiSanPhamModule,
        DashboardModule,
        HangSanPhamModule,
        SanPhamModule,
        AnhSanPhamModule,
        ThongSoSanPhamModule,
        DanhMucTinTucModule,
        TinTucModule,
        AnhTinTucModule,
        BinhLuanTinTucModule,
        NhaCungCapModule,
        HoaDonNhapModule,
        HoaDonXuatModule,
        ChucVuModule,
        NhanVienModule,
        KhachHangModule,
        RoleModule,
        SlideModule,
        AboutModule,
        ContactModule,
        AccountModule,
        FeedBackModule,
        ResetPassModule,
        ChangePassModule,
        MaGiamGiaModule,
        GiamGiaActiveModule,
        //PrimeNG
        BrowserModule,
        AvatarModule,
        AvatarGroupModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RippleModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BadgeModule,
        BreadcrumbModule,
        BlockUIModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        ChipModule,
        ColorPickerModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ContextMenuModule,
        VirtualScrollerModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DockModule,
        DragDropModule,
        DropdownModule,
        DynamicDialogModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        ImageModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrganizationChartModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressSpinnerModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        SelectButtonModule,
        SidebarModule,
        ScrollerModule,
        ScrollPanelModule,
        ScrollTopModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SpeedDialModule,
        SpinnerModule,
        SplitterModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TriStateCheckboxModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        AnimateModule,
        CardModule,
        RouterModule
    ]
})
export class LayoutModule {}
