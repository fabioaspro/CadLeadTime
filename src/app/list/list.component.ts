import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild, } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { PoModule, PoTableColumn, PoTableModule, PoButtonModule, PoMenuItem, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule, PoTableAction, PoModalAction,} from '@po-ui/ng-components';
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

    //Chamada para testar parametro
    //this.onEditar(20)

    //Criar um registro novo passando 0 o ID
    this.router.navigate(['form/' + obj ]) 

  }

  //---Apagar Registro
  onDeletar(){

  }

  //---Salvar Registro
  onSalvar(){


  }

}
