# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Open a Public Issue

Security vulnerabilities should **not** be reported through public GitHub issues.

### 2. Report Privately

Email security concerns to: **security@irgadgets.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **24 hours**: Initial acknowledgment
- **72 hours**: Preliminary assessment
- **7 days**: Detailed response with fix timeline
- **30 days**: Security patch released (if confirmed)

## Security Best Practices

### For Users

1. **Keep dependencies updated:**
   ```bash
   yarn audit
   yarn upgrade
   ```

2. **Use strong credentials:**
   - Generate SESSION_SECRET with: `openssl rand -base64 32`
   - Use strong database passwords
   - Rotate secrets regularly

3. **Enable HTTPS:**
   - Always use HTTPS in production
   - Configure SSL/TLS properly

4. **Configure environment properly:**
   - Set NODE_ENV=production
   - Restrict CORS_ORIGINS to your domains only
   - Set appropriate rate limits

5. **Regular backups:**
   - Automated daily database backups
   - Store backups securely
   - Test restoration procedures

### For Contributors

1. **Never commit secrets:**
   - No API keys in code
   - No passwords in code
   - Use .env files (gitignored)

2. **Validate all inputs:**
   - Use Zod schemas
   - Sanitize user input
   - Validate on both client and server

3. **Follow secure coding practices:**
   - Use parameterized queries (Drizzle ORM)
   - Implement proper error handling
   - Avoid sensitive data in logs

4. **Review dependencies:**
   - Check for known vulnerabilities
   - Keep dependencies updated
   - Use trusted packages only

## Known Security Features

### Implemented

✅ **Security Headers** (Helmet.js)
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

✅ **Rate Limiting**
- API: 100 requests per 15 minutes
- Forms: 5 submissions per 15 minutes

✅ **CORS Protection**
- Configurable allowed origins
- Credentials support

✅ **Input Validation**
- Zod schemas on all inputs
- Type-safe API contracts

✅ **SQL Injection Protection**
- Parameterized queries via Drizzle ORM

✅ **Secure Sessions**
- HTTP-only cookies
- Encrypted session data

✅ **Error Handling**
- No sensitive data in error responses
- Structured error logging

### Roadmap

⏳ **Planned Security Features:**
- [ ] CSRF token protection
- [ ] Request signing
- [ ] API authentication (JWT/OAuth)
- [ ] Content validation on file uploads
- [ ] Audit logging
- [ ] Intrusion detection

## Security Checklist for Production

- [ ] All environment variables are set securely
- [ ] SESSION_SECRET is strong and unique
- [ ] HTTPS is enabled and enforced
- [ ] Database credentials are strong
- [ ] CORS origins are restricted to your domains
- [ ] Rate limiting is configured
- [ ] Error monitoring is set up (Sentry)
- [ ] Regular backups are automated
- [ ] Security updates are applied promptly
- [ ] Access logs are monitored
- [ ] Firewall rules are configured
- [ ] Database access is restricted
- [ ] Sensitive data is not logged
- [ ] Security headers are verified

## Disclosure Policy

When we receive a security bug report:

1. We confirm the vulnerability
2. We develop and test a fix
3. We release a security update
4. We publicly disclose the vulnerability (after fix is deployed)
5. We credit the reporter (if desired)

## Security Updates

Subscribe to security updates:

- Watch this repository for security advisories
- Follow [@irgadgets on Twitter](https://twitter.com/irgadgets)
- Subscribe to our mailing list: security-updates@irgadgets.com

## Contact

Security Team: security@irgadgets.com

PGP Key: [Available upon request]

---

**Thank you for helping keep IrGadgets secure!**
