import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/services/evento.service';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public EventosFiltrados: Evento[] = [];
  public widthImage: Number = 150;
  public marginImage: Number = 2;
  public alterarImagem = false;
  private _filtroEventos: string = '';


  constructor(private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public get filtroEventos() {
    return this._filtroEventos;
  }

  public set filtroEventos(value: string) {
    this._filtroEventos = value;
    this.EventosFiltrados = this.filtroEventos ? this.FiltrarEventos(this.filtroEventos) : this.eventos;
  }

  public FiltrarEventos(FiltrarPor: string): Evento[] {
    FiltrarPor = FiltrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) =>
        evento.tema.toLocaleLowerCase().indexOf(FiltrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(FiltrarPor) !== -1
      );
  }

  public mostrarImagem(): void {
    this.alterarImagem = !this.alterarImagem;
  }

  public getEventos(): void {
    const observer = {
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos,
        this.EventosFiltrados = this.eventos
      },
      error: (error: any) => {
        console.log(error),
        this.spinner.hide(),
        this.toastr.error('Erro ao Carregar os Eventos','Erro!')
      },
      complete: () => this.spinner.hide()
    }
    this.eventoService.getEvento().subscribe(observer)
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
