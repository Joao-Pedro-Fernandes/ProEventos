import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { ComparePassword } from 'src/app/helpers/comparePassword';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ComparePassword.mustMatch('senha', 'confirmaSenha')
    };

    this.form = this.fb.group({
      titulo: ['',Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      funcao: ['', Validators.required],
      descricao: ['', Validators.required],
      senha: ['', Validators.minLength(8)],
      confirmaSenha: ['']
    }, formOptions);
  }

  resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
