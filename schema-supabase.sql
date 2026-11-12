-- Clínica da Ordenha: esquema para Supabase (PostgreSQL)
-- Os nomes das colunas são os mesmos do app (clinica-ordenha.html) e das abas do .xlsx exportado.
-- Cole no SQL Editor do Supabase e execute.

create table clientes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),

  -- Produtor
  nome text not null,
  telefone text not null,
  prioridade char(1) not null check (prioridade in ('A','B','C','D')),
  perfil text check (perfil in ('Visual','Auditivo (ouvinte)','Cinestésico','Misto')),
  assistencia text check (assistencia in ('Clínica da Ordenha','Forte Leite','Milkvel','Ordemilk','Milktec','Ordetec','SmartFarm','AlfaMilk','CB Soluções','Ordemed','Sem assistência','Outros')),
  ultima_visita date,
  vendedor text not null check (vendedor in ('Gustavo Wunder Costa','Mara Cleve','Felipe','Vendedor 1','Vendedor 2')),
  inservice text check (inservice in ('Sim','Não')),

  -- Propriedade (1 produtor : 1 propriedade)
  propriedade text,
  cidade text not null,
  regiao text,
  tensao text check (tensao in ('127 V','220 V','380 V')),
  placa_solar text check (placa_solar in ('Sim','Não')),
  gps_lat numeric(9,6) check (gps_lat between -90 and 90),
  gps_lng numeric(9,6) check (gps_lng between -180 and 180),
  gps_link text,

  -- Equipamento de ordenha
  ord_marca text not null,
  tipo_equipamento text not null check (tipo_equipamento in ('Balde ao pé fixo','Balde ao pé móvel','Canalizado')),
  tipo_sala text check (tipo_sala in ('Espinha de peixe','NZ','Paralelo','Carrossel')),
  unidades_ordenha int not null check (unidades_ordenha > 0),
  conjunto_marca text,
  conjunto_modelo text,
  linha_leite_altura text,
  diam_linha_leite text check (diam_linha_leite in ('51 mm','63 mm','76 mm')),
  diam_linha_vacuo text check (diam_linha_vacuo in ('51 mm','63 mm','76 mm')),
  diam_linha_limpeza text check (diam_linha_limpeza in ('38 mm','51 mm')),
  unidade_final_l numeric,
  mangueira text check (mangueira in ('PVC','Borracha','Silicone')),
  medidor_leite text,                                         -- tipo de medidor de leite
  pulsador_tipo text check (pulsador_tipo in ('Eletrônico','Mecânico','Central com repetidores')),
  pulsador_marca text,
  extracao text check (extracao in ('Sim','Não')),          -- extrator de teteiras
  extracao_marca text,
  bomba_vacuo text,
  contencao text,
  prog_limpeza_ordenha text check (prog_limpeza_ordenha in ('Sim','Não')),
  prog_limpeza_ordenha_marca text,
  prog_limpeza_tanque text check (prog_limpeza_tanque in ('Sim','Não')),
  prog_limpeza_tanque_marca text,
  nobreak text check (nobreak in ('Sim','Não')),
  boiler text check (boiler in ('Sim','Não')),
  boiler_marca text,                                          -- tipo do boiler

  -- Rebanho e produção
  animais_ordenha int not null check (animais_ordenha >= 0),
  producao_dia numeric,
  ordenhas_dia smallint check (ordenhas_dia in (2,3)),
  lotes int,

  -- Estrutura (somente tipo)
  tipo_barracao text check (tipo_barracao in ('Compost barn','Free stall','Tie stall / estábulo','Semiconfinamento','Pasto','Outro')),
  ventilacao text,                                            -- marca/modelo
  cocador_vacas text check (cocador_vacas in ('Sim','Não')),
  cocador_vacas_marca text,
  cocador_bezerras text check (cocador_bezerras in ('Sim','Não')),
  cocador_bezerras_marca text,
  scrapper text check (scrapper in ('Sim','Não')),
  scrapper_marca text,
  robo_empurrar text check (robo_empurrar in ('Sim','Não')),
  robo_empurrar_marca text,
  automacao_alim text check (automacao_alim in ('Sim','Não')),
  automacao_alim_marca text,

  -- Produtos (marca, produto e se compra de nós)
  p_pre_dipping_marca text check (p_pre_dipping_marca in ('DeLaval','GEA','Weizur','Kron','Launer','C-Tec','RUM','Quimitol','Ordenhe','America Nutrients','Prima Raça','Kercia','BRS','Bous','AZ Clean','Não usa','Outra')),
  p_pre_dipping_produto text,
  p_pre_dipping_nos text check (p_pre_dipping_nos in ('Sim','Não')),
  p_pos_dipping_marca text check (p_pos_dipping_marca in ('DeLaval','GEA','Weizur','Kron','Launer','C-Tec','RUM','Quimitol','Ordenhe','America Nutrients','Prima Raça','Kercia','BRS','Bous','AZ Clean','Não usa','Outra')),
  p_pos_dipping_produto text,
  p_pos_dipping_nos text check (p_pos_dipping_nos in ('Sim','Não')),
  p_alcalino_marca text check (p_alcalino_marca in ('DeLaval','GEA','Weizur','Kron','Launer','C-Tec','RUM','Quimitol','Ordenhe','America Nutrients','Prima Raça','Kercia','BRS','Bous','AZ Clean','Não usa','Outra')),
  p_alcalino_produto text,
  p_alcalino_nos text check (p_alcalino_nos in ('Sim','Não')),
  p_acido_marca text check (p_acido_marca in ('DeLaval','GEA','Weizur','Kron','Launer','C-Tec','RUM','Quimitol','Ordenhe','America Nutrients','Prima Raça','Kercia','BRS','Bous','AZ Clean','Não usa','Outra')),
  p_acido_produto text,
  p_acido_nos text check (p_acido_nos in ('Sim','Não')),
  p_sanitizante_marca text check (p_sanitizante_marca in ('DeLaval','GEA','Weizur','Kron','Launer','C-Tec','RUM','Quimitol','Ordenhe','America Nutrients','Prima Raça','Kercia','BRS','Bous','AZ Clean','Não usa','Outra')),
  p_sanitizante_produto text,
  p_sanitizante_nos text check (p_sanitizante_nos in ('Sim','Não')),
  p_oleo_bomba text,
  p_oleo_bomba_nos text check (p_oleo_bomba_nos in ('Sim','Não')),

  -- Marca diferente de DeLaval => "compra de nós" é obrigatoriamente 'Não'
  constraint compra_nos_so_delaval check (
    (p_pre_dipping_marca is null or p_pre_dipping_marca = 'DeLaval' or p_pre_dipping_nos = 'Não') and
    (p_pos_dipping_marca is null or p_pos_dipping_marca = 'DeLaval' or p_pos_dipping_nos = 'Não') and
    (p_alcalino_marca is null or p_alcalino_marca = 'DeLaval' or p_alcalino_nos = 'Não') and
    (p_acido_marca is null or p_acido_marca = 'DeLaval' or p_acido_nos = 'Não') and
    (p_sanitizante_marca is null or p_sanitizante_marca = 'DeLaval' or p_sanitizante_nos = 'Não')
  )
);

create table resfriadores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id_cliente uuid not null references clientes(id) on delete cascade,
  marca text not null,
  capacidade_l numeric not null check (capacidade_l > 0),
  modelo text,
  ordenhas int
);

create table visitas (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id_cliente uuid not null references clientes(id) on delete cascade,
  vendedor text,                                              -- quem fez a visita
  data date,
  obs text,
  oportunidades text,
  retorno date
);

create index on clientes (owner_id, cidade);
create index on clientes (owner_id, ord_marca);
create index on resfriadores (id_cliente);
create index on visitas (id_cliente);

-- Atualiza atualizado_em automaticamente
create function set_atualizado_em() returns trigger language plpgsql as $$
begin new.atualizado_em = now(); return new; end $$;
create trigger trg_clientes_atualizado before update on clientes
  for each row execute function set_atualizado_em();

-- Segurança: cada usuário vê e altera somente os próprios registros
alter table clientes enable row level security;
alter table resfriadores enable row level security;
alter table visitas enable row level security;
create policy "clientes do dono" on clientes for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "resfriadores do dono" on resfriadores for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "visitas do dono" on visitas for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Visões para o dashboard
create view v_marcas_por_cidade with (security_invoker = true) as
  select cidade, ord_marca, count(*) as clientes, sum(unidades_ordenha) as conjuntos
  from clientes group by cidade, ord_marca;

create view v_totais_por_regiao with (security_invoker = true) as
  select coalesce(c.regiao, c.cidade) as regiao,
         count(*) as clientes,
         sum(c.animais_ordenha) as vacas_em_ordenha,
         sum(c.producao_dia) as litros_dia,
         coalesce(sum(r.cap), 0) as resfriamento_l
  from clientes c
  left join lateral (select sum(capacidade_l) as cap from resfriadores where id_cliente = c.id) r on true
  group by coalesce(c.regiao, c.cidade);
