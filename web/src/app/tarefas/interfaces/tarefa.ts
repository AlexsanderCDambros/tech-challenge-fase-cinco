export interface ITarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  status: 'A fazer' | 'Em andamento' | 'Finalizada';
}
