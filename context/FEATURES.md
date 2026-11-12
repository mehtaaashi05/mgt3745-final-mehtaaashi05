# Features and specification

## Context

An intern on one team becomes curious about another and wants firsthand information before deciding whether to pursue a move, without signaling dissatisfaction or requesting a transfer.

## Users

Profiles and evidence are documented in [USERS.md](USERS.md): PROFILE-01 (The Hesitant Explorer), who is curious about another team but has not acted yet, and PROFILE-02 (The Proactive Outreacher), who shows that a receptive contact can be reached without an existing connection.

## Scope

The product goal is to help an intern find an employee from another team for one short, informal, no-commitment conversation. This static prototype supports searching a curated directory; it does not implement conversation requests, manager visibility, or a no-standing-impact guarantee.

It does not cover formal transfer or rotation applications, scheduling automation, performance or return-offer decisions, or full-time employees. F-01 is a static curated directory with a local opt-in request-file handoff; it has no shared backend or immediate publishing.

## Features

| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning | Status |
|---|---|---|---|---|---|
| F-01 | Curated directory of employees willing to have a 15-20 minute informal conversation with an intern from another team | Must-be | Both segments - Sept 08 | INT-02 succeeded via self-arranged cold outreach; INT-01 confirmed no formal way exists to find who is approachable. | Built as static curated data; example profiles only |
| F-02 | Explicit information-only and no-commitment framing on every conversation request | Performance | Hesitant Explorer - Sept 08 | INT-01 said “tell me about your team” felt less risky than “I want to move.” | Deferred beyond the directory boundary |
| F-03 | Current manager notification framed as standard program participation with no-standing-impact guarantee | Performance | Hesitant Explorer - Sept 08 | INT-02's manager reacted positively, challenging the assumption that visibility itself is the risk. | Deferred; requires organizational workflow and authentication |
| F-04 | Static content pages of typical work per line of business | Indifferent | Both segments - Sept 08 | INT-02 said shadowing, not reading, confirmed interest. | Selected for HW5 delegation; usefulness remains uncertain |
| F-05 | Formal application required just to start an exploratory conversation | Reverse | Both segments - Sept 08 | Both interviews showed that the value came from low-commitment, informal contact. | Rejected because it adds friction |
| F-06 | Anonymized visibility into how many interns completed exploratory conversations | Attractive | Both segments - Sept 08 | This would target the perceived-versus-actual risk gap by normalizing exploration. | Deferred |

## Previously built feature: F-01 opt-in directory

F-01 is implemented as a static directory loaded from `data/directory.json`. Interns can search curated entries by name, team, or topic. The opt-in form creates a JSON request file in the employee's browser; it does not upload data or update the directory. A maintainer must review a request, edit the JSON file, and redeploy. An employee must contact the maintainer privately to opt out; removal is not immediate or self-service. The checked-in profiles are fictional, and this prototype does not yet provide real employee matching.

The discovery insight guiding this feature is that reputational risk is perceived as significantly greater than the cost actually enforced. The prototype emphasizes voluntary participation, a private request handoff, and clear information-only framing. The implementation boundary is documented in [ARCHITECTURE.md](ARCHITECTURE.md).

## Selected HW5 feature: F-04 line-of-business guide

F-04 adds a small, static guide to typical work by line of business, alongside the existing directory. Business Credit and Treasury Management are the example areas named in the interviews; their summaries must be labeled illustrative rather than official role descriptions or transfer recommendations. The guide is a starting point for deciding what to ask an opted-in employee, not a substitute for shadowing or a conversation.

### F-04 acceptance criteria (EARS)

- WHEN an intern opens the guide, THE SYSTEM SHALL show the available example areas: Business Credit and Treasury Management.
- WHEN an intern selects an area, THE SYSTEM SHALL display its summary of typical work and at least one conversation starter.
- WHEN an intern selects a different area, THE SYSTEM SHALL show the newly selected area's content while keeping the other area available.
- THE SYSTEM SHALL label each summary as illustrative, not an official role description or transfer recommendation.
- WHEN an intern selects a guide area, THE SYSTEM SHALL keep the curated directory available without changing its JSON data.

## F-01 acceptance criteria (EARS)

- WHEN an intern opens the directory, THE SYSTEM SHALL load curated entries from the checked-in JSON file and identify the examples as fictional.
- WHEN an intern searches, THE SYSTEM SHALL match names, teams, and topics without regard to letter case.
- WHEN an employee completes the opt-in form, THE SYSTEM SHALL download a request file locally and SHALL NOT send or publish the submitted details.
- WHEN a maintainer reviews an opt-in request, THE SYSTEM SHALL require the maintainer to update the JSON file and redeploy before the entry appears.
- WHEN an employee wants to opt out, THE SYSTEM SHALL direct them to contact the maintainer privately and explain that removal requires a republish.
- THE SYSTEM SHALL show an on-page error if the curated directory cannot be loaded or is malformed.

## Constraints

- This public static prototype has no authentication; anyone who can access the page can read its published data.
- The examples are fictional. Real employee details may be published only after explicit approval and an appropriate privacy review.
- Opt-in requests are not sent from the page. A private, approved handoff to a maintainer is required.
- An employee can request removal from the maintainer, but this prototype does not provide immediate self-service removal.
- The organization must make clear that a conversation is not a formal transfer request and carries no negative standing impact.
- The system must retain no conversation content, only the fact that a request was made and its status.

## Deferred product acceptance criteria (EARS)

- WHEN a request is submitted, THE SYSTEM SHALL confirm within 2 seconds.
- WHEN an intern completes two conversations, THE SYSTEM SHALL show the manager was notified of both and no negative flag was recorded.
- WHEN an employee opts out, THE SYSTEM SHALL remove them from results within 1 minute.
- WHEN the internship ends, THE SYSTEM SHALL disable new requests by the next day.
- WHEN an exploratory request completes, THE SYSTEM SHALL NOT create a transfer request.

## Verification

The F-01 code checks are in `evals/f01.test.js`. They verify the curated
fictional records, name/team/topic search, request-file payload, and that
preparing a request does not alter the published directory. These tests do not
verify that any real employee opted in, that an intern can contact a real
employee, or that a private handoff and redeployment occurred. F-04 checks are
in `evals/f04-guide.test.js`.

## AI assistance

The static implementation has no Worker or server request logs. The public data boundary and the local-only request file are described in [ARCHITECTURE.md](ARCHITECTURE.md) and ADR-003. The checked-in directory contains fictional, non-sensitive data only.

## Related files

- [Project framing](PROJECT.md)
- [User profiles and evidence](USERS.md)
- [Architecture decision and ADR-003](ARCHITECTURE.md)
- [Coding standards](STANDARDS.md)
- [Agent instructions](CLAUDE.md)
- [Project README](../README.md)
