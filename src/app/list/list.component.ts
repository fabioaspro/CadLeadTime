import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild, } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { PoModule, PoTableColumn, PoTableModule, PoButtonModule, PoMenuItem, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule, PoTableAction, PoModalAction, PoDialogService, PoNotificationService,} from '@po-ui/ng-components';
import { ServerTotvsService } from '../services/server-totvs.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoModalModule,
    PoTableModule,
    PoMenuModule,
    PoModule,
    FormsModule,
    PoButtonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  private srvTotvs = inject(ServerTotvsService);
  private srvNotification = inject(PoNotificationService);
  private srvDialog = inject(PoDialogService);
  private router = inject(Router)
  
  //Variaveis 
  loadTela: boolean = false
  tituloTela!:string
  //lista: any;
  tipoAcao:string=''

  //---Grid
  colunas!: PoTableColumn[]
  lista!: any[]

  //--- Actions
  readonly opcoes: PoTableAction[] = [
    {
      label: 'Editar',
      icon: 'bi bi-pencil-square',
      action: this.onEditar.bind(this),
    },
    {
      separator:true,
      label: 'Deletar',
      icon: 'bi bi-trash',
      action: this.onDeletar.bind(this),
      type:'danger'
    }];

  
  readonly acaoSalvar: PoModalAction = {
    label: 'Salvar',
    action: () => { this.onSalvar() }
  }

  readonly acaoCancelar: PoModalAction = {
    label: 'Cancelar',
    action: () => { //this.cadModal?.close()
       }
  }
  formBuilder: any;
  nomeEstabel: string | undefined;

  ngOnInit(): void {
    
    //Colunas do grid
    this.colunas = this.srvTotvs.obterColunas()
    this.listar()
  }

  //---Listar registros grid
  listar() {
    this.loadTela = true;

    this.srvTotvs.Obter().subscribe({
      next: (response: any) => {
        if (response === null) return
        this.lista = response.items
        this.loadTela = false
      },
      error: (e) => {
                    //this.srvNotification.error('Ocorreu um erro na requisição')
                    alert('erro')
                    this.loadTela=false},
    });
  }

  //---Novo registro
  onNovo() {
    
    //Criar um registro novo passando 0 o ID
    this.router.navigate(['form/0']) 
    
  }

  //---Editar registro
  onEditar(obj: any | null) {    

    /*
    this.nomeEstabel = ''

    if ((obj !== null) && (obj['$showAction'] !== undefined))
       delete obj['$showAction']

    if (obj !== null) {
      this.nomeEstabel = obj.nomeEstabel
      this.tipoAcao='E'
      this.form.patchValue(obj)
    }*/

    //Criar um registro novo passando 0 o ID
    
    this.router.navigate(['form/' + obj.codEstabel ]) 

  }

  //---Deletar registro
  onDeletar(obj: any | null) {
    let paramTela:any={codEstabel:obj.codEstabel}
    
    this.srvDialog.confirm({
      title: "DELETAR REGISTRO",
      message: `Confirma deleção do registro: ${obj.nomeEstabel} ?`,
      confirm: () => {
        this.loadTela = true
        this.srvTotvs.Deletar(paramTela).subscribe({
          next: (response: any) => {
            this.srvNotification.success('Registro eliminado com sucesso')
            this.listar()
          },
         // error: (e) => this.srvNotification.error('Ocorreu um erro na requisição'),
        })
      },
      cancel: () => this.srvNotification.error("Cancelada pelo usuário")
    })
  }

  //---Salvar Registro
  onSalvar(){


  }

}
