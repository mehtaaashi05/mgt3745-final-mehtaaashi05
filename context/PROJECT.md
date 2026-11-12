# PROJECT.md

Status: ACTIVE.

An intern on one team becomes curious about another and wants firsthand information before deciding whether to pursue a move, without signaling dissatisfaction or requesting a transfer. This prototype supports searching a curated static directory and preparing a local opt-in request snippet. It does not submit requests, arrange conversations, notify managers, or provide a no-standing-impact guarantee.

## Problem statement

Interns often want firsthand information about another team but hesitate to ask
because curiosity can look like dissatisfaction or a transfer request. This
directory gives them a low-commitment way to find an employee who has opted in
to a short conversation, while keeping the example data fictional and
non-sensitive.

## Who it is for

Primary users are hesitant interns exploring another team's work. Secondary
users are employees willing to describe their work and managers who need the
activity framed as ordinary development rather than a transfer signal.

## Scope

In: searching fictional curated profiles by name, team, or topic, and preparing
a request snippet for manual curation. Out: messaging, identity verification,
transfer requests, and manager approvals. Deferred: a real private intake and
removal process, real employee profiles, and automated publishing.

## Constraints

The project is a zero-budget static site using a checked-in JSON file and no
application server. The published file is public. Current profiles and contact
addresses are fictional; real employee details must not be added until an
approved private intake, consent, and removal process exists. The opt-in form
only prepares a local JSON snippet. See [ARCHITECTURE.md](ARCHITECTURE.md) and
[ADR-002](../docs/ADR-002.md).
