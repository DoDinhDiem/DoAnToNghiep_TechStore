import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
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
import { LayoutComponent } from './layout.component'
import { HeaderComponent } from '../header/header.component'
import { FooterComponent } from '../footer/footer.component'

import { HomeComponent } from '../../Pages/home/home.component'
import { ProductComponent } from 'src/app/Pages/product/product.component'
import { ProductDetailComponent } from 'src/app/Pages/product-detail/product-detail.component'
import { BlogComponent } from 'src/app/Pages/blog/blog.component'
import { BlogDetailComponent } from 'src/app/Pages/blog-detail/blog-detail.component'
import { ShoppingCartComponent } from 'src/app/Pages/shopping-cart/shopping-cart.component'
import { CheckOutComponent } from 'src/app/Pages/check-out/check-out.component'
import { ProfileComponent } from 'src/app/Pages/profile/profile.component'
import { AccountComponent } from 'src/app/Pages/account/account.component'
import { AboutComponent } from 'src/app/Pages/about/about.component'
import { ContactComponent } from 'src/app/Pages/contact/contact.component'

import { HomeModule } from '../../Pages/home/home.module'
import { ProductModule } from 'src/app/Pages/product/product.module'
import { ProductDetailModule } from 'src/app/Pages/product-detail/product-detail.module'
import { BlogModule } from 'src/app/Pages/blog/blog.module'
import { BlogDetailModule } from 'src/app/Pages/blog-detail/blog-detail.module'
import { ShoppingCartModule } from 'src/app/Pages/shopping-cart/shopping-cart.module'
import { CheckOutModule } from 'src/app/Pages/check-out/check-out.module'
import { ProfileModule } from 'src/app/Pages/profile/profile.module'
import { AccountModule } from 'src/app/Pages/account/account.module'
import { AboutModule } from 'src/app/Pages/about/about.module'
import { ContactModule } from 'src/app/Pages/contact/contact.module'

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ProductComponent,
        ProductDetailComponent,
        BlogComponent,
        BlogDetailComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        ProfileComponent,
        AccountComponent,
        AboutComponent,
        ContactComponent
    ],
    imports: [
        HomeModule,
        ProductModule,
        CommonModule,
        ProductDetailModule,
        BlogModule,
        BlogDetailModule,
        ShoppingCartModule,
        CheckOutModule,
        ProfileModule,
        AccountModule,
        AboutModule,
        ContactModule,

        //PrimeNG
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
