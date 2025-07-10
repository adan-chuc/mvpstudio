import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, projectDescription } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !projectDescription) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato de email inválido' 
      });
    }

    // Create email content (HTML version)
    const emailContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #1e293b; font-size: 24px; font-weight: 600; margin-bottom: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
            🚀 Nuevo Lead Interesado en MVP
          </h1>
          
          <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h2 style="color: #334155; font-size: 18px; margin-bottom: 16px; display: flex; align-items: center;">
              👤 Información del Cliente
            </h2>
            <p style="margin: 8px 0; color: #475569;"><strong>Nombre:</strong> ${fullName}</p>
            <p style="margin: 8px 0; color: #475569;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0; color: #475569;"><strong>Teléfono:</strong> <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a></p>
          </div>

          <div style="background: #ecfdf5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h2 style="color: #065f46; font-size: 18px; margin-bottom: 16px; display: flex; align-items: center;">
              💡 Descripción del Proyecto
            </h2>
            <p style="color: #047857; line-height: 1.6; white-space: pre-wrap;">${projectDescription}</p>
          </div>

          <div style="background: #eff6ff; border-radius: 8px; padding: 20px; text-align: center;">
            <h3 style="color: #1e40af; margin-bottom: 12px;">🎯 Acciones Sugeridas</h3>
            <p style="color: #1e40af; margin-bottom: 16px; font-size: 14px;">Responder dentro de las próximas 24 horas para mayor conversión</p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block;">
                📧 Responder Email
              </a>
              <a href="tel:${phone}" style="background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block;">
                📞 Llamar Cliente
              </a>
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              Este email fue generado automáticamente desde tu formulario de contacto MVP Studio
            </p>
          </div>
        </div>
      </div>
    `;

    // Create text version (plain text fallback)
    const textContent = `
🚀 NUEVO LEAD INTERESADO EN MVP

👤 INFORMACIÓN DEL CLIENTE:
Nombre: ${fullName}
Email: ${email}
Teléfono: ${phone}

💡 DESCRIPCIÓN DEL PROYECTO:
${projectDescription}

🎯 ACCIONES SUGERIDAS:
- Responder por email: ${email}
- Llamar al cliente: ${phone}
- Tiempo recomendado de respuesta: 24 horas

---
Este email fue generado automáticamente desde tu formulario de contacto MVP Studio
    `;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: `MVP Studio <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [process.env.RESEND_TO_EMAIL || 'delivered@resend.dev'],
      subject: `🚀 Nuevo Cliente MVP: ${fullName} quiere validar su idea`,
      html: emailContent,
      text: textContent, // Plain text version
      replyTo: email, // Allow direct reply to the client
    });

    console.log('Email sent successfully:', emailResponse);

    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado correctamente',
      emailId: emailResponse.data?.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle specific Resend errors
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'Error de configuración del servidor' 
      });
    }
    
    if (error.message?.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' 
      });
    }

    return res.status(500).json({ 
      error: 'Error interno del servidor. Intenta de nuevo más tarde.' 
    });
  }
}