# Features and specification

## Context

An intern on one team becomes curious about another and wants firsthand information before deciding whether to pursue a move, without signaling dissatisfaction or requesting a transfer.

## Users

Profiles and evidence are documented in [USERS.md](USERS.md): PROFILE-01 (The Hesitant Explorer), who is curious about another team but has not acted yet, and PROFILE-02 (The Proactive Outreacher), who shows that a receptive contact can be reached without an existing connection.

## Scope

The project goal is to help an intern find an employee from another team for one short, informal, no-commitment conversation. This prototype only searches fictional, curated profiles; it does not arrange conversations, notify managers, or guarantee no standing impact.

It does not cover formal transfer or rotation applications, scheduling, performance or return-offer decisions, or full-time employees. F-01 is implemented as a static JSON directory with browser-side search. The opt-in form prepares a local request snippet but does not submit or publish it.

## Features

| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning | Status |
|---|---|---|---|---|---|
| F-01 | Opt-in directory of employees willing to have a 15-20 minute informal conversation with an intern from another team | Must-be | Both segments - Sept 08 | INT-02 succeeded via self-arranged cold outreach; INT-01 confirmed no formal way exists to find who is approachable. | Built as static curated JSON; fictional examples only |
| F-02 | Explicit information-only and no-commitment framing on every conversation request | Performance | Hesitant Explorer - Sept 08 | INT-01 said “tell me about your team” felt less risky than “I want to move.” | Deferred beyond the directory boundary |
| F-03 | Current manager notification framed as standard program participation with no-standing-impact guarantee | Performance | Hesitant Explorer - Sept 08 | INT-02's manager reacted positively, challenging the assumption that visibility itself is the risk. | Deferred; requires organizational workflow and authentication |
| F-04 | Static content pages of typical work per line of business | Indifferent | Both segments - Sept 08 | INT-02 said shadowing, not reading, confirmed interest. | Selected for HW5 delegation; usefulness remains uncertain |
| F-05 | Formal application required just to start an exploratory conversation | Reverse | Both segments - Sept 08 | Both interviews showed that the value came from low-commitment, informal contact. | Rejected because it adds friction |
| F-06 | Anonymized visibility into how many interns completed exploratory conversations | Attractive | Both segments - Sept 08 | This would target the perceived-versus-actual risk gap by normalizing exploration. | Deferred |

## Previously built feature: F-01 opt-in directory

F-01 is a static directory loaded from `data/directory.json`. Interns can search by name, team, or topic. The opt-in form creates a copyable JSON snippet on the visitor's device; it does not upload data or update the directory. No approved private intake or opt-out channel exists, so real employee opt-ins are not active. The checked-in profiles are fictional and do not provide real employee matching.

The discovery insight guiding this feature is that reputational risk is perceived as significantly greater than the cost actually enforced. The prototype does not implement a real private opt-in or opt-out workflow. The implementation boundary is documented in [ARCHITECTURE.md](ARCHITECTURE.md).

## Selected HW5 feature: F-04 line-of-business guide

F-04 adds a small, static guide to typical work by line of business, alongside the existing directory. Business Credit and Treasury Management are the example areas named in the interviews; their summaries must be labeled illustrative rather than official role descriptions or transfer recommendations. The guide is a starting point for deciding what to ask an opted-in employee, not a substitute for shadowing or a conversation.

### F-04 acceptance criteria (EARS)

- WHEN an intern opens the guide, THE SYSTEM SHALL show the available example areas: Business Credit and Treasury Management.
- WHEN an intern selects an area, THE SYSTEM SHALL display its summary of typical work and at least one conversation starter.
- WHEN an intern selects a different area, THE SYSTEM SHALL show the newly selected area's content while keeping the other area available.
- THE SYSTEM SHALL label each summary as illustrative, not an official role description or transfer recommendation.
- WHEN an intern selects a guide area, THE SYSTEM SHALL keep the static directory available without changing its JSON data.

## F-01 acceptance criteria (EARS)

- WHEN an intern opens the directory, THE SYSTEM SHALL load fictional curated profiles from `data/directory.json` and identify them as examples.
- WHEN an intern searches, THE SYSTEM SHALL match profile names, teams, and topics without regard to letter case.
- WHEN an employee completes the request form, THE SYSTEM SHALL display a copyable JSON snippet locally and SHALL NOT send or publish the submitted details.
- THE SYSTEM SHALL show an on-page error if the curated directory cannot be loaded or contains malformed profiles.
- BEFORE any real profile is published, THE SYSTEM SHALL require an approved private intake and removal process, explicit permission, maintainer review, and redeployment.

## Constraints

- The public static site has no authentication; anyone can read its published JSON.
- Profiles are fictional. Do not enter real employee data in the demo form.
- No approved private opt-in or opt-out process is currently available.
- The organization must make clear that a conversation is not a formal transfer request and carries no negative standing impact.
No real-user test has been completed. Automated checks with fictional profiles verify the search and snippet behavior, not real employee matching.

## AI assistance

AI assisted with the static-directory implementation and documentation. I
reviewed the changes against the repository and tested the app and curated
data. The static app makes no Worker or server requests; its trust boundary is
documented in [ARCHITECTURE.md](ARCHITECTURE.md) and
[ADR-002](../docs/ADR-002.md). The checked-in profiles are fictional.

## Related files

- [Project framing](PROJECT.md)
- [User profiles and evidence](USERS.md)
- [Architecture decision and ADR-002](ARCHITECTURE.md)
- [Coding standards](STANDARDS.md)
- [Agent instructions](CLAUDE.md)
- [Project README](../README.md)
