import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request
    const validatedData = inquirySchema.parse(body)
    const { name, email, message } = validatedData

    // Send email via Resend
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'talibffdc@gmail.com',
      subject: 'New Inquiry Received',
      html: `
        <div style="font-family: serif; line-height: 1.8; color: #333; max-width: 600px;">
          <h2 style="color: #1a1a1a; font-weight: 300; font-size: 20px; margin-bottom: 24px;">
            New Inquiry Received
          </h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #999;">
              From
            </p>
            <p style="margin: 0; font-size: 16px; color: #333;">
              ${name}
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #999;">
              Email
            </p>
            <p style="margin: 0; font-size: 16px; color: #333;">
              <a href="mailto:${email}" style="color: #8b6f47; text-decoration: none;">
                ${email}
              </a>
            </p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #999;">
              Message
            </p>
            <p style="margin: 0; font-size: 16px; color: #333; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 24px; font-size: 12px; color: #999;">
            <p style="margin: 0;">
              This inquiry was sent from your fragrance website's contact form.
            </p>
          </div>
        </div>
      `,
    })

    if (response.error) {
      console.error('Resend error:', response.error)
      return Response.json(
        { success: false, error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Your inquiry has been sent. Thank you for reaching out.',
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      return Response.json(
        {
          success: false,
          error: firstError.message,
        },
        { status: 400 }
      )
    }

    // Handle other errors
    console.error('Inquiry API error:', error)
    return Response.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
