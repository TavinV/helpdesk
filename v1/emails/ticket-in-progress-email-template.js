const ticketInProgressEmailTemplate = (ticket, technician) => {
    return `
        <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atendimento Iniciado - Helpdesk</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7f9;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: #2563eb;
            color: white;
            padding: 25px;
            text-align: center;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .content {
            padding: 30px;
        }

        h1 {
            color: #2563eb;
            margin-bottom: 20px;
            font-size: 24px;
        }

        p {
            margin-bottom: 15px;
            color: #4b5563;
        }

        .ticket-info {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            padding: 20px;
            margin: 25px 0;
        }

        .info-item {
            margin-bottom: 10px;
            display: flex;
        }

        .info-label {
            font-weight: bold;
            min-width: 150px;
            color: #1e40af;
        }

        .info-value {
            color: #374151;
        }

        .ticket-id {
            font-size: 20px;
            font-weight: bold;
            color: #2563eb;
            padding: 10px;
            text-align: center;
            background: #eff6ff;
            border-radius: 4px;
            margin: 15px 0;
        }

        .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        .support-info {
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
        }

        @media (max-width: 600px) {
            .content {
                padding: 20px;
            }
            
            .info-item {
                flex-direction: column;
            }
            
            .info-label {
                min-width: auto;
                margin-bottom: 5px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
        </div>

        <div class="content">
            <h1>Atendimento Iniciado</h1>

            <p>Olá,</p>

            <p>Informamos que o técnico <strong>${technician.name}</strong> iniciou o atendimento do seu chamado.</p>

            <div class="ticket-info">
                <div class="info-item">
                    <span class="info-label">Título:</span>
                    <span class="info-value">${ticket.title}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Técnico Responsável:</span>
                    <span class="info-value">${technician.name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Email do Técnico:</span>
                    <span class="info-value">${technician.email}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status:</span>
                    <span class="info-value">Em Andamento</span>
                </div>
            </div>

            <p>O técnico responsável entrará em contato caso necessite de mais informações para resolver o seu problema.</p>

            <div class="support-info">
                <p><strong>Equipe Helpdesk</strong><br>
                    Suporte Técnico em TI<br>
                    Email: suporte@helpdesk.com<br>
                    Telefone: (11) 3456-7890</p>
            </div>
        </div>

        <div class="footer">
            <p>© 2023 Helpdesk - Todos os direitos reservados.</p>
            <p>Este é um e-mail automático, por favor não responda.</p>
        </div>
    </div>
</body>

</html>
    `;
};

export default ticketInProgressEmailTemplate;