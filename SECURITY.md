# Security Policy

## 1. Purpose

Security is an important consideration in the development and maintenance of Esurpys.

This policy describes how potential security vulnerabilities should be reported, reviewed, and addressed. It also outlines basic security expectations for contributors.

Esurpys is an evolving web application. This policy does not guarantee that the application is free from security vulnerabilities.

## 2. Supported Versions

Esurpys is currently under active development.

A formal version support policy and security maintenance schedule have not yet been established. Information about supported releases will be added when a formal release process is introduced.

Until then, security fixes will generally be considered for the current maintained codebase.

## 3. Reporting a Vulnerability

**Please do not publicly disclose suspected security vulnerabilities or publish exploit details before they have been reviewed.**

If you discover a potential vulnerability, use GitHub's private vulnerability reporting feature for this repository, if it is enabled.

Repository maintainers can review or configure private vulnerability reporting through the repository's GitHub security settings.

If private reporting is unavailable, open a minimal public issue asking for a private reporting channel. Do not include exploit instructions, credentials, personal data, or other sensitive information in that issue.

Do not assume that a public issue is a confidential reporting channel.

## 4. Information to Include

When reporting a vulnerability through an appropriate private channel, include as much of the following information as you can safely provide:

- A concise description of the vulnerability.
- The affected page, component, route, or dependency.
- The affected version or commit, if known.
- Steps to reproduce the issue.
- The potential security impact.
- Relevant logs or proof-of-concept material, with secrets and personal information removed.
- Any known conditions required to reproduce the issue.

Please report only information you are authorized to access and test. Do not access, modify, or disclose other users' data.

## 5. Response and Remediation

Reports will be reviewed as project resources permit.

Depending on the nature and severity of a confirmed vulnerability, remediation may include:

- A code change.
- A configuration update.
- A dependency update.
- A security-related documentation change.
- A deployment or release containing a correction.

Formal response-time commitments and a coordinated disclosure process have not yet been established.

Please allow maintainers a reasonable opportunity to investigate and address a reported issue before publicly disclosing technical details.

## 6. Security Best Practices

Contributors and maintainers should follow these practices:

- Never commit passwords, API keys, access tokens, private keys, or other secrets.
- Keep credentials and environment-specific secrets out of source control.
- Validate and handle untrusted input appropriately.
- Apply suitable authorization and access controls.
- Minimize the collection and retention of personal information.
- Keep dependencies reasonably up to date.
- Review dependency changes and application configuration for security implications.
- Avoid exposing sensitive details in error messages, logs, issues, commits, or documentation.
- Review changes before deployment.
- Use appropriate access controls for GitHub and Vercel accounts.

If a secret is accidentally committed, removing it from the latest version of a file may not remove it from Git history. Revoke or rotate the exposed credential promptly and assess whether further remediation is required.

## 7. Web Application Security

When contributing to the Esurpys web application, take particular care with:

- Input validation and output handling.
- Authentication and authorization, where applicable.
- Third-party dependencies.
- Environment variables and deployment configuration.
- Protection of personal information.
- External links and third-party integrations.
- Error handling and the exposure of internal application details.

Do not assume that client-side validation alone provides security. Any sensitive operation must be protected by appropriate server-side controls.

## 8. Scope and Limitations

This policy applies to security concerns involving the Esurpys project and its maintained codebase.

It does not authorize testing against systems, accounts, infrastructure, or data that you do not own or have explicit permission to assess.

This policy describes the project's current security intentions. It does not guarantee that every vulnerability will be identified, that every report will be accepted, or that a particular response or remediation time will be met.

## 9. Privacy

Do not include unnecessary personal information or confidential user data in vulnerability reports.

Any evidence submitted should be limited to what is necessary to explain and reproduce the issue. Remove secrets, credentials, and unrelated personal information wherever possible.

## 10. Policy Updates

This policy may be updated as Esurpys develops and establishes more formal security, release, and vulnerability disclosure procedures.