import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.css']
})
export class EventoDetalheComponent implements OnInit {

  form: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  public validation() : void {
    this.form = this.fb.group({
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      tema: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imageURL: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public reset(): void {
    this.form.reset();
  }

}
