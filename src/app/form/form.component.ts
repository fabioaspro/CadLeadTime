import { ChangeDetectorRef, Component, inject, OnInit, ViewChild,} from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router} from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { PoDividerModule, PoFieldModule, PoComboComponent, PoDialogComponent, PoDialogService, PoMenuItem, PoModalAction, 
         PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn,
         PoModalModule, PoTableModule, PoTableComponent, PoMenuModule,
         PoModule, PoButtonModule, PoToolbarModule,
         PoPageModule,} from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServerTotvsService } from '../services/server-totvs.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    PoModalModule,
    PoTableModule,
    PoModule,
    PoFieldModule,
    PoDividerModule,
    PoButtonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  private srvTotvs = inject(ServerTotvsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
 
  route= inject(ActivatedRoute)
 
  //Variaveis
  dadosInclusao!: string;
  dadosAlteracao!: string;

  //ListasCombo
  listaEstabelecimentos!: any[]

  //Formulario
  public form = this.formBuilder.group({
    codEstabel: ['', Validators.required],
    nomeEstabel: [''],
    leadTime: ['', [Validators.required, Validators.minLength(2)]],
    Inclusao: ['', Validators.required],
    Alteracao: ['', Validators.required],    
  });

  onSalvar() {

    //Salva o Registro no Banco de Dados
    //
    //Volta ao form List
    this.router.navigate(['list'])    

  }
  onCancelar() {
    
    //Volta ao form List
    this.router.navigate(['list']) 
    
  }

  ngOnInit(): void {

    //Carregar combo de estabelecimentos
    this.srvTotvs.ObterEstabelecimentos().subscribe({
      next: (response: any) => {
        this.listaEstabelecimentos = (response as any[]).sort(
          this.srvTotvs.ordenarCampos(['label']))
      },
      error: (e) => {
        //this.srvNotification.error('Ocorreu um erro na requisição')
        return
      },
    });

    this.route.params.subscribe(params => {
      if (params['id']) {

        this.form.controls['codEstabel'].setValue ("131");
        this.form.controls['leadTime'].setValue ("10");
        this.form.controls['Inclusao'].setValue ("super - 30/04/2024");
        this.form.controls['Alteracao'].setValue ("super - 30/04/2024");

      }
      else {

        this.form.controls['codEstabel'].setValue ("131 CAMPINAS");
        this.form.controls['leadTime'].setValue ("10");
        this.form.controls['Inclusao'].setValue ("super - 30/04/2024");
        this.form.controls['Alteracao'].setValue ("super - 30/04/2024");

      }

    })
  }
}
